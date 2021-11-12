(defun build/export-all ()
 (mapc
 (lambda (x)
   (with-current-buffer
       (find-file-noselect x)
     (org-hugo-export-wim-to-md t)))
 (directory-files "./org" nil "^[0-9]+$" t))
 )
