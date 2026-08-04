CREATE TABLE application_forms
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL,
    user_id UUID NOT NULL,
    form_type_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_application_forms_status
        CHECK (
        status IN (
            'NEW',
            'IN_REVIEW',
            'APPROVED',
            'REJECTED',
            'CANCELLED'
        )
    ),

    CONSTRAINT fk_application_forms_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_application_forms_form_type
        FOREIGN KEY (form_type_id)
        REFERENCES form_types(id)
        ON DELETE RESTRICT
);