#!/bin/zsh

#Select all changes
git add —all

#Display changes for confirmation
git diff HEAD

#Create your commit
echo "Please enter your commit message, what have you changed? Keep to one sentence."
read com_msg
git commit -m $com_msg

#Now send it off!
git push origin master
