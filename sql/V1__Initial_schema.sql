-- Prefix
-- m is master data can not edit
-- c is config data create & update from admit ui
-- t is transaction data

CREATE TABLE public.m_role (
	id serial NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT m_role_pk PRIMARY KEY (id)
);

create type upload_type as enum('image', 'file');

CREATE TABLE public.t_upload (
	id serial NOT NULL,
	upload_type upload_type NOT NULL,
	filename varchar(255) NOT NULL,
	filename_thumbnail varchar(255) NULL,
	filename_thumbnail_small varchar(255) NULL,
	"timestamp" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT t_upload_pkey PRIMARY KEY (id)
);

CREATE TABLE public.t_user (
	id serial NOT NULL,
	username varchar(50) NOT NULL,
	"password" varchar(100) NOT NULL,
	"name" varchar(100) NULL,
	phone varchar(20) NULL,
	email varchar(50) NULL,
	avatar_id int4 NULL,
	is_admin bool NOT NULL DEFAULT false,
	create_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	is_active bool NOT NULL DEFAULT true,
	CONSTRAINT t_user_pk PRIMARY KEY (id),
	CONSTRAINT t_user_fk FOREIGN KEY (avatar_id) REFERENCES t_upload(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX t_user_is_active_idx ON public.t_user USING btree (is_active);
CREATE INDEX t_user_username_idx ON public.t_user USING btree (username);

CREATE TABLE public.t_user_roles (
	id serial NOT NULL,
	user_id int4 NOT NULL,
	role_id int4 NOT NULL,
	CONSTRAINT t_user_roles_pk PRIMARY KEY (id),
	CONSTRAINT t_user_roles_fk FOREIGN KEY (user_id) REFERENCES t_user(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT t_user_roles_fk_1 FOREIGN KEY (role_id) REFERENCES m_role(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX t_user_roles_role_id_idx ON public.t_user_roles USING btree (role_id);
CREATE INDEX t_user_roles_user_id_idx ON public.t_user_roles USING btree (user_id);

CREATE TABLE public.c_media_type (
	id serial NOT NULL,
	"label" varchar(50) NOT NULL,
	active bool NOT NULL DEFAULT true,
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT c_media_type_pkey PRIMARY KEY (id),
	CONSTRAINT c_media_type_fk FOREIGN KEY (update_by) REFERENCES t_user(id)
);
CREATE INDEX c_media_type_active_idx ON public.c_media_type USING btree (active);
