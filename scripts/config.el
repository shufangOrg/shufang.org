(defun build/export-all ()
  "Export all org-files (including nested) under notes-org-files."

(setq notes-org-files "./org/")

  (dolist (org-file (directory-files-recursively notes-org-files "\.org$"))
    (with-current-buffer (find-file org-file)
      (message (format "[build] Exporting %s" org-file))
      (org-hugo-export-wim-to-md :all-subtrees nil nil nil)))

  (message "Done!"))
