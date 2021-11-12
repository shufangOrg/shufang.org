(defun eh-org-clean-space (text backend info)
  "Remove the space between chinese characters during exporting to HTML."
  ;; https://github.com/hick/emacs-chinese#%E4%B8%AD%E6%96%87%E6%96%AD%E8%A1%8C
  (when (org-export-derived-backend-p backend 'html)
    (let ((regexp "[[:multibyte:]]")
	  (string text))
      ;; Org converts line-break with space by default, remove this as this is not necessary for chinese characters
      (setq string
	    (replace-regexp-in-string
	     (format "\\(%s\\) *\n *\\(%s\\)" regexp regexp)
	     "\\1\\2" string))
;;      ;; remove the space before the bold
;;      (setq string
;;	    (replace-regexp-in-string
;;	     (format "\\(%s\\) +\\(<\\)" regexp)
;;	     "\\1\\2" string))
;;      ;; remove the space after the bold
;;      (setq string
;;	    (replace-regexp-in-string
;;	     (format "\\(>\\) +\\(%s\\)" regexp)
;;	     "\\1\\2" string))
      string))
  )
(with-eval-after-load 'ox
  (add-to-list 'org-export-filter-paragraph-functions 'eh-org-clean-space)
  )

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
