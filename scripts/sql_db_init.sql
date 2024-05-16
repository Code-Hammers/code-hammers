-- CREATE JOBS TABLE
CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    description TEXT,
    url VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CREATE STATUSES TABLE
CREATE TABLE IF NOT EXISTS statuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- INSERT DEFAULT STATUSES
INSERT INTO statuses (name) VALUES
    ('Applied'),
    ('Interviewing'),
    ('Offer Received'),
    ('Rejected'),
    ('Withdrawn');

-- CREATE APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    job_id INT NOT NULL,
    status_id INT NOT NULL,
    date_applied TIMESTAMPTZ DEFAULT NOW(),
    notes TEXT,
    FOREIGN KEY (job_id) REFERENCES jobs(id),
    FOREIGN KEY (status_id) REFERENCES statuses(id)
);

-- SEED APPLICATION DATA

INSERT INTO jobs (title, company, location, description, url) VALUES
    ('Software Engineer', 'Dogs R Us', 'Penticton, BC', 'Back end API development', 'https://httpstatusdogs.com'),
    ('Web Developer', 'Cats R Us', 'Ottawa, ON', 'Migrating to React 19', 'https://httpcats.com'),
    ('Project Manager', 'Calabogie Zoo', 'Calabogie, ON', 'Developing new website', 'https://www.torontozoo.com');


INSERT INTO applications (job_id, status_id, date_applied, notes) VALUES
    (1, 1, NOW(), 'Quick applied for Software Engineer at Dogs R Us.'),
    (2, 1, NOW(), 'Full CS style application.'),
    (3, 2, NOW(), 'Phone screen scheduled!');