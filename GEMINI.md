When committing changes, follow these steps:  

1. Use `git diff` to review the changes.  
2. Use `git log -n 5` to review recent commit messages.  
3. Propose a commit message.  
4. Write the message to a temporary file named `commit_message.txt`.  
5. Use `git commit -F commit_message.txt` to commit the changes.  
6. Use `del commit_message.txt` to remove the temporary file.

You should use file-based method when you write commit message and commit the changes.
