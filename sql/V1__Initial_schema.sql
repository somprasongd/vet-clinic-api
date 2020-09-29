-- Prefix
-- m is master data can not edit
-- c is config data create & update from admit ui
-- t is transaction data

-- master data
CREATE TABLE public.m_appoint_status (
	id serial NOT NULL,
	"label" varchar NOT NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT m_appoint_status_pk PRIMARY KEY (id)
);
CREATE INDEX m_appoint_status_active_idx ON public.m_appoint_status USING btree (active);

CREATE TABLE public.m_appoint_type (
	id serial NOT NULL,
	"label" varchar NOT NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT m_appoint_type_pk PRIMARY KEY (id)
);
CREATE INDEX m_appoint_type_active_idx ON public.m_appoint_type USING btree (active);

CREATE TABLE public.m_billing_type (
	id serial NOT NULL,
	"label" varchar NOT NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT m_billing_type_pk PRIMARY KEY (id)
);
CREATE INDEX m_billing_type_active_idx ON public.m_billing_type USING btree (active);

CREATE TABLE public.m_item_group (
	id serial NOT NULL,
	"label" varchar NOT NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT m_item_group_pk PRIMARY KEY (id)
);
CREATE INDEX m_item_group_active_idx ON public.m_item_group USING btree (active);

CREATE TABLE public.m_item_lab_group (
	id serial NOT NULL,
	"label" varchar NOT NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT m_item_lab_group_pk PRIMARY KEY (id)
);
CREATE INDEX m_item_lab_group_active_idx ON public.m_item_lab_group USING btree (active);

CREATE TABLE public.m_media_type (
	id serial NOT NULL,
	"label" varchar NOT NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT m_media_type_pk PRIMARY KEY (id)
);
CREATE INDEX m_media_type_active_idx ON public.m_media_type USING btree (active);

CREATE TABLE public.m_order_status (
	id serial NOT NULL,
	"label" varchar NOT NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT m_order_status_pk PRIMARY KEY (id)
);
CREATE INDEX m_order_status_active_idx ON public.m_order_status USING btree (active);

CREATE TABLE public.m_payment_type (
	id serial NOT NULL,
	"label" varchar NOT NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT m_payment_type_pk PRIMARY KEY (id)
);
CREATE INDEX m_payment_type_active_idx ON public.m_payment_type USING btree (active);

CREATE TABLE public.m_prefix (
	id serial NOT NULL,
	"label" varchar NOT NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT m_prefix_pk PRIMARY KEY (id)
);
CREATE INDEX m_prefix_active_idx ON public.m_prefix USING btree (active);

CREATE TABLE public.m_pet_gender (
	id serial NOT NULL,
	"label" varchar NOT NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT m_pet_gender_pk PRIMARY KEY (id)
);
CREATE INDEX m_pet_gender_active_idx ON public.m_pet_gender USING btree (active);

CREATE TABLE public.m_pet_type (
	id serial NOT NULL,
	"label" varchar NOT NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT m_pet_type_pk PRIMARY KEY (id)
);
CREATE INDEX m_pet_type_active_idx ON public.m_pet_type USING btree (active);

CREATE TABLE public.m_user_role (
	id serial NOT NULL,
	"label" varchar(50) NOT NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT m_user_role_pkey PRIMARY KEY (id)
);
CREATE INDEX m_user_role_active_idx ON public.m_user_role USING btree (active);

CREATE TABLE public.m_visit_cause (
	id serial NOT NULL,
	"label" varchar(50) NOT NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT m_visit_cause_pkey PRIMARY KEY (id)
);
CREATE INDEX m_visit_cause_active_idx ON public.m_visit_cause USING btree (active);

CREATE TABLE public.m_visit_priority (
	id serial NOT NULL,
	"label" varchar(50) NOT NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT m_visit_priority_pkey PRIMARY KEY (id)
);
CREATE INDEX m_visit_priority_active_idx ON public.m_visit_priority USING btree (active);

CREATE TABLE public.m_visit_status (
	id serial NOT NULL,
	"label" varchar(50) NOT NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT m_visit_status_pkey PRIMARY KEY (id)
);
CREATE INDEX m_visit_status_active_idx ON public.m_visit_status USING btree (active);

CREATE TABLE public.m_visit_treatment (
	id serial NOT NULL,
	"label" varchar(50) NOT NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT m_visit_treatment_pkey PRIMARY KEY (id)
);
CREATE INDEX m_visit_treatment_active_idx ON public.m_visit_treatment USING btree (active);

CREATE TABLE public.m_visit_type (
	id serial NOT NULL,
	"label" varchar(50) NOT NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT m_visit_type_pkey PRIMARY KEY (id)
);
CREATE INDEX m_visit_type_active_idx ON public.m_visit_type USING btree (active);


-- transaction data
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
	CONSTRAINT t_user_roles_fk_1 FOREIGN KEY (role_id) REFERENCES m_user_role(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX t_user_roles_role_id_idx ON public.t_user_roles USING btree (role_id);
CREATE INDEX t_user_roles_user_id_idx ON public.t_user_roles USING btree (user_id);


