CREATE TABLE application_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    application_id UUID NOT NULL,

    actor_id UUID REFERENCES users(id) ON DELETE SET NULL,

    action VARCHAR(30) NOT NULL,

    old_status VARCHAR(20),
    new_status VARCHAR(20),

    description VARCHAR(500) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CHECK (
        action IN (
            'CREATED',
            'UPDATED',
            'STATUS_CHANGED',
            'DELETED'
        )
    ),

    CHECK (
        old_status IS NULL
        OR old_status IN (
            'NEW',
            'IN_REVIEW',
            'APPROVED',
            'REJECTED',
            'CANCELLED'
        )
    ),

    CHECK (
        new_status IS NULL
        OR new_status IN (
            'NEW',
            'IN_REVIEW',
            'APPROVED',
            'REJECTED',
            'CANCELLED'
        )
    )
);

CREATE INDEX idx_application_audit_logs_application_id
    ON application_audit_logs(application_id);

CREATE INDEX idx_application_audit_logs_actor_id
    ON application_audit_logs(actor_id);

CREATE INDEX idx_application_audit_logs_created_at
    ON application_audit_logs(created_at);