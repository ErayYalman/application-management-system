CREATE INDEX idx_application_forms_user_id
    ON application_forms(user_id);

CREATE INDEX idx_application_forms_form_type_id
    ON application_forms(form_type_id);

CREATE INDEX idx_application_forms_status
    ON application_forms(status);

CREATE INDEX idx_attachments_application_form_id
    ON attachments(application_form_id);