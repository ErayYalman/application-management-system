CREATE TABLE attachments
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_form_id UUID NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    stored_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_attachments_application_form
        FOREIGN KEY (application_form_id)
        REFERENCES application_forms(id)
        ON DELETE CASCADE
);