#!/usr/bin/env bash

set -Eeuo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

error() {
    echo -e "${RED}Error: $1${NC}" >&2
}

success() {
    echo -e "${GREEN}$1${NC}"
}

info() {
    echo -e "${BLUE}$1${NC}"
}

# 1. Check Git repository
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    error "You are not inside a Git repository."
    exit 1
fi

# 2. Check Git identity
if ! git var GIT_AUTHOR_IDENT >/dev/null 2>&1; then
    error "Git author identity is not configured."
    echo "Configure it using:"
    echo '  git config --global user.name "Your Name"'
    echo '  git config --global user.email "you@example.com"'
    exit 1
fi

# 3. Check for changes
if [[ -z "$(git status --porcelain)" ]]; then
    info "Working tree is clean. Nothing to commit."
    exit 0
fi

echo
info "Current Git status:"
git status --short
echo

# 4. Stage changes
read -r -p "Stage all changes with 'git add .'? [Y/n]: " stage_confirm
stage_confirm="${stage_confirm:-Y}"

if [[ ! "$stage_confirm" =~ ^([Yy]|[Yy][Ee][Ss])$ ]]; then
    error "Operation cancelled."
    exit 1
fi

if ! git add .; then
    error "Failed to stage changes."
    exit 1
fi

success "Changes staged successfully."

# 5. Validate staged changes
if git diff --cached --quiet; then
    error "No staged changes to commit."
    exit 1
fi

echo
info "Staged changes:"
git diff --cached --stat
echo

# 6. Ask for commit message
while true; do
    read -r -p "Enter commit message: " commit_message

    if [[ -z "${commit_message//[[:space:]]/}" ]]; then
        error "Commit message cannot be empty."
        continue
    fi

    if [[ "$commit_message" == -* ]]; then
        error "Commit message cannot start with '-'."
        continue
    fi

    break
done

# 7. Confirm commit
echo
echo "Commit message: $commit_message"
read -r -p "Proceed with commit? [Y/n]: " commit_confirm
commit_confirm="${commit_confirm:-Y}"

if [[ ! "$commit_confirm" =~ ^([Yy]|[Yy][Ee][Ss])$ ]]; then
    error "Commit cancelled. Staged changes are preserved."
    exit 1
fi

if ! git commit -m "$commit_message"; then
    error "Commit failed. Check the Git output above."
    exit 1
fi

success "Commit created successfully."

# 8. Ask for remote
echo
remotes="$(git remote)"

if [[ -z "$remotes" ]]; then
    error "No Git remote is configured."
    echo "Add one with: git remote add origin <repository-url>"
    exit 1
fi

echo "Available remotes:"
git remote -v | awk '!seen[$1]++ { print "  " $1 }'
echo

while true; do
    read -r -p "Enter remote name [origin]: " remote
    remote="${remote:-origin}"

    if [[ "$remote" =~ ^[a-zA-Z0-9._/-]+$ ]] &&
       git remote get-url "$remote" >/dev/null 2>&1; then
        break
    fi

    error "Invalid remote name or remote does not exist."
    echo "Choose one of the available remotes shown above."
done

# 9. Ask for branch
echo
info "Available local branches:"
git branch --format='  %(refname:short)'
echo

while true; do
    read -r -p "Enter branch to push to: " branch

    if [[ -z "${branch//[[:space:]]/}" ]]; then
        error "Branch name cannot be empty."
        continue
    fi

    if ! git check-ref-format --branch "$branch" >/dev/null 2>&1; then
        error "Invalid branch name."
        continue
    fi

    if git show-ref --verify --quiet "refs/heads/$branch"; then
        break
    fi

    echo "Branch '$branch' does not exist locally."
    read -r -p "Create it from the current HEAD? [y/N]: " create_confirm

    if [[ "$create_confirm" =~ ^([Yy]|[Yy][Ee][Ss])$ ]]; then
        if git switch -c "$branch"; then
            success "Created and switched to branch '$branch'."
            break
        else
            error "Could not create branch."
        fi
    fi
done

# 10. Confirm push
echo
echo "Remote: $remote"
echo "Branch: $branch"
echo "Commit: $commit_message"
echo

read -r -p "Push commit to '$remote/$branch'? [Y/n]: " push_confirm
push_confirm="${push_confirm:-Y}"

if [[ ! "$push_confirm" =~ ^([Yy]|[Yy][Ee][Ss])$ ]]; then
    error "Push cancelled. Your commit is saved locally."
    exit 0
fi

# 11. Push
if git push -u "$remote" "HEAD:refs/heads/$branch"; then
    success "Successfully pushed to $remote/$branch!"
else
    error "Push failed. Your commit is still saved locally."
    echo "Check your network, permissions, authentication, and branch conflicts."
    exit 1
fi
