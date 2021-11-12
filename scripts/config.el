(defun build/export-all ()
  "Export all org-files (including nested) under notes-org-files."

  (setq notes-org-files "./org/")

  (dolist (org-file (directory-files-recursively notes-org-files "\.org$"))
    (with-current-buffer (find-file org-file)
      (ignore-errors
	(let ((enable-local-variables :all))
	  (hack-dir-local-variables-non-file-buffer))
	)
      (message (format "[build] Exporting %s" org-file))
      (org-hugo-export-wim-to-md)))

  (message "Done!"))
