typeset msg="$1";
git merge --no-ff --no-commit dev;
git reset HEAD dev; 
git checkout -- dev;
git commit -m "$msg";
