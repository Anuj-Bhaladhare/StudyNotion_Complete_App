-- ChatGPT: https://chatgpt.com/c/6a5618a1-fdb4-83ee-91af-362ab75b7732

-- Create the Database
CREATE DATABASE study_notion_db;

-- Create the Tables

CREATE TABLE users(
    id SERIAL PRIMARY KEY,	
    
    first_name VARCHAR(100) NOT NULL,
    
    last_name VARCHAR(100) NOT NULL,	
    
    email VARCHAR(255) NOT NULL UNIQUE,	
    
    password_hash TEXT NOT NULL,	
    
    account_type VARCHAR(30)
        CHECK (account_type IN ('Student', 'Instructor', 'Admin')),	
    
    profile_id BIGINT UNIQUE,	
    
    is_active BOOLEAN NOT NULL DEFAULT TRUE,	
    
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,	
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,	
    
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE courses (
    id BIGSERIAL PRIMARY KEY,

    course_name VARCHAR(255) NOT NULL,

    course_description TEXT NOT NULL,

    what_you_will_learn TEXT,

    price NUMERIC(10,2) NOT NULL
        CHECK (price >= 0),

    thumbnail_url TEXT,

    language VARCHAR(50) DEFAULT 'English',

    level VARCHAR(20) NOT NULL DEFAULT 'Beginner'
        CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'All Levels')),

    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT'
        CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),

    duration_minutes INTEGER DEFAULT 0
        CHECK (duration_minutes >= 0),

    average_rating NUMERIC(2,1) DEFAULT 0.0
        CHECK (average_rating BETWEEN 0 AND 5),

    total_ratings INTEGER DEFAULT 0
        CHECK (total_ratings >= 0),

    total_students INTEGER DEFAULT 0
        CHECK (total_students >= 0),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP

);


CREATE TABLE profiles(
    id SERIAL PRIMARY KEY,
    
    user_id BIGINT NOT NULL UNIQUE,
    
    gender VARCHAR(30)
        CHECK (gender IN ('Male', 'Female', 'Other', 'Prefer Not to Say')),
    
    date_of_birth DATE,
    
    about TEXT,
    
    contact_number VARCHAR(15),
    
    profile_image TEXT,
    
    address TEXT,
    
    city VARCHAR(100),
    
    state VARCHAR(100),
    
    country VARCHAR(100),
    
    postal_code VARCHAR(100),
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_profile_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


CREATE TABLE course_progress (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    course_id BIGINT NOT NULL,

    completed_lectures INTEGER NOT NULL DEFAULT 0
        CHECK (completed_lectures >= 0),

    progress_percentage NUMERIC(5,2) NOT NULL DEFAULT 0.00
        CHECK (progress_percentage BETWEEN 0 AND 100),

    is_completed BOOLEAN NOT NULL DEFAULT FALSE,

    last_accessed_at TIMESTAMPTZ,

    completed_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_course_progress_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_course_progress_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_course_progress
        UNIQUE (user_id, course_id)
);


CREATE TABLE sections (
    id BIGSERIAL PRIMARY KEY,

    course_id BIGINT NOT NULL,

    section_name VARCHAR(255) NOT NULL,

    description TEXT,

    section_order INTEGER NOT NULL
        CHECK (section_order > 0),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_section_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_course_section_order
        UNIQUE (course_id, section_order)
);


CREATE TABLE rating_and_reviews (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    course_id BIGINT NOT NULL,

    rating SMALLINT NOT NULL
        CHECK (rating BETWEEN 1 AND 5),

    review TEXT,

    is_approved BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_review_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_review_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_user_course_review
        UNIQUE (user_id, course_id)
);


CREATE TABLE tags (
    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,

    description TEXT,

    slug VARCHAR(120) NOT NULL UNIQUE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE sub_sections (
    id BIGSERIAL PRIMARY KEY,

    section_id BIGINT NOT NULL,

    title VARCHAR(255) NOT NULL,

    description TEXT,

    video_url TEXT NOT NULL,

    time_duration INTEGER NOT NULL
        CHECK (time_duration >= 0),

    lecture_order INTEGER NOT NULL
        CHECK (lecture_order > 0),

    is_preview BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_subsection_section
        FOREIGN KEY (section_id)
        REFERENCES sections(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_section_lecture_order
        UNIQUE (section_id, lecture_order)
);


CREATE TABLE otp (
    id BIGSERIAL PRIMARY KEY,

    email VARCHAR(255) NOT NULL,

    otp VARCHAR(6) NOT NULL,

    purpose VARCHAR(30) NOT NULL
        CHECK (purpose IN ('EMAIL_VERIFICATION', 'PASSWORD_RESET', 'LOGIN_VERIFICATION')),

    is_used BOOLEAN NOT NULL DEFAULT FALSE,

    expires_at TIMESTAMPTZ NOT NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL '5 minutes'),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);




users               -> DONE
profiles            -> DONE
categories          -> 
tags                -> DONE
courses             -> DONE
course_tags         -> 
sections            -> DONE
lectures            -> 
enrollments         -> 
lecture_progress    -> 
course_progress     -> DONE
course_reviews      -> 
orders              -> 
payments            -> 
invoices            -> 
wishlists           -> 
Sub_Section         -> DONE
OTP                 -> DONE
Rating_and_Reviews  -> DONE

