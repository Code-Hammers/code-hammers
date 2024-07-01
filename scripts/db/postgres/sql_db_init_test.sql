-- DROP EXISTING TABLES
DROP TABLE IF EXISTS follow_ups;
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS statuses;
DROP TABLE IF EXISTS follow_up_types;

-- CREATE JOBS TABLE
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    description TEXT,
    url VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CREATE STATUSES TABLE
CREATE TABLE statuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- INSERT DEFAULT STATUSES
INSERT INTO statuses (name) VALUES
    ('Applied'),
    ('Phone Screen'),
    ('Interviewing'),
    ('Offer Received'),
    ('Rejected'),
    ('Withdrawn');

-- CREATE FOLLOW-UP TYPES TABLE
CREATE TABLE follow_up_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- INSERT DEFAULT FOLLOW-UP TYPES
INSERT INTO follow_up_types (name) VALUES
    ('After Apply'),
    ('After Phone Screen'),
    ('After Interview'),
    ('After Technical Interview'),
    ('After Offer Received'),
    ('After Rejection'),
    ('After Withdrawal');

-- CREATE APPLICATIONS TABLE
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    job_id INT NOT NULL,
    status_id INT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    quick_apply BOOLEAN NOT NULL,
    date_applied TIMESTAMPTZ DEFAULT NOW(),
    general_notes TEXT,
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    notification_period INT DEFAULT 3,
    notifications_paused BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (job_id) REFERENCES jobs(id),
    FOREIGN KEY (status_id) REFERENCES statuses(id)
);

-- CREATE FOLLOW-UPS TABLE
CREATE TABLE follow_ups (
    id SERIAL PRIMARY KEY,
    application_id INT NOT NULL,
    follow_up_date TIMESTAMPTZ DEFAULT NOW(),
    follow_up_type_id INT NOT NULL,
    notes TEXT,
    FOREIGN KEY (application_id) REFERENCES applications(id),
    FOREIGN KEY (follow_up_type_id) REFERENCES follow_up_types(id)
);
