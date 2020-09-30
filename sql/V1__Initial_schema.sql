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

-- config tables

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

CREATE TABLE public.c_user (
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
	active bool NOT NULL DEFAULT true,
	CONSTRAINT c_user_pk PRIMARY KEY (id),
	CONSTRAINT c_user_fk FOREIGN KEY (avatar_id) REFERENCES t_upload(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX c_user_active_idx ON public.c_user USING btree (active);
CREATE INDEX c_user_username_idx ON public.c_user USING btree (username);

CREATE TABLE public.c_user_roles (
	id serial NOT NULL,
	user_id int4 NOT NULL,
	role_id int4 NOT NULL,
	CONSTRAINT c_user_roles_pk PRIMARY KEY (id),
	CONSTRAINT c_user_roles_un UNIQUE (user_id, role_id),
	CONSTRAINT c_user_roles_fk FOREIGN KEY (user_id) REFERENCES c_user(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT c_user_roles_fk_1 FOREIGN KEY (role_id) REFERENCES m_user_role(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX c_user_roles_role_id_idx ON public.c_user_roles USING btree (role_id);
CREATE INDEX c_user_roles_user_id_idx ON public.c_user_roles USING btree (user_id);

CREATE TABLE public.c_cc (
	id serial NOT NULL,
	code varchar(50) NOT NULL,
	"label" text NOT NULL,
	active bool NOT NULL DEFAULT true,
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT c_cc_code_436a11f8_uniq UNIQUE (code),
	CONSTRAINT c_cc_pkey PRIMARY KEY (id),
	CONSTRAINT c_cc_update_by_ac024b10_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX c_cc_active_7352d9ec ON public.c_cc USING btree (active);
CREATE INDEX c_cc_code_436a11f8_like ON public.c_cc USING btree (code varchar_pattern_ops);
CREATE INDEX c_cc_update_by_ac024b10 ON public.c_cc USING btree (update_by);

CREATE TABLE public.c_ht (
	id serial NOT NULL,
	code varchar(50) NOT NULL,
	"label" text NOT NULL,
	active bool NOT NULL DEFAULT true,
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT c_ht_code_436a11f8_uniq UNIQUE (code),
	CONSTRAINT c_ht_pkey PRIMARY KEY (id),
	CONSTRAINT c_ht_update_by_ac024b10_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX c_ht_active_7352d9ec ON public.c_ht USING btree (active);
CREATE INDEX c_ht_code_436a11f8_like ON public.c_ht USING btree (code varchar_pattern_ops);
CREATE INDEX c_ht_update_by_ac024b10 ON public.c_ht USING btree (update_by);

CREATE TABLE public.c_pe (
	id serial NOT NULL,
	code varchar(50) NOT NULL,
	"label" text NOT NULL,
	active bool NOT NULL DEFAULT true,
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT c_pe_code_436a11f8_uniq UNIQUE (code),
	CONSTRAINT c_pe_pkey PRIMARY KEY (id),
	CONSTRAINT c_pe_update_by_ac024b10_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX c_pe_active_7352d9ec ON public.c_pe USING btree (active);
CREATE INDEX c_pe_code_436a11f8_like ON public.c_pe USING btree (code varchar_pattern_ops);
CREATE INDEX c_pe_update_by_ac024b10 ON public.c_pe USING btree (update_by);

CREATE TABLE public.c_dx (
	id serial NOT NULL,
	code varchar(50) NOT NULL,
	"label" text NOT NULL,
	active bool NOT NULL DEFAULT true,
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT c_dx_code_436a11f8_uniq UNIQUE (code),
	CONSTRAINT c_dx_pkey PRIMARY KEY (id),
	CONSTRAINT c_dx_update_by_ac024b10_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX c_dx_active_7352d9ec ON public.c_dx USING btree (active);
CREATE INDEX c_dx_code_436a11f8_like ON public.c_dx USING btree (code varchar_pattern_ops);
CREATE INDEX c_dx_update_by_ac024b10 ON public.c_dx USING btree (update_by);

CREATE TABLE public.c_item (
	id serial NOT NULL,
	code varchar(20) NOT NULL,
	"label" varchar(100) NOT NULL,
	active bool NOT NULL DEFAULT true,
	item_group_id int4 NOT NULL,
	is_set bool NOT NULL DEFAULT false, -- for lab
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,	
	update_by int4 NOT NULL,
	"cost" float8 NULL,
	price float8 NULL,
	CONSTRAINT c_item_code_uniq UNIQUE (code),
	CONSTRAINT c_item_pkey PRIMARY KEY (id),
	CONSTRAINT c_item_item_group_id_fk_m_item_group_id FOREIGN KEY (item_group_id) REFERENCES m_item_group(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT c_item_update_by_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX c_item_active ON public.c_item USING btree (active);
CREATE INDEX c_item_code_like ON public.c_item USING btree (code varchar_pattern_ops);
CREATE INDEX c_item_item_group_id ON public.c_item USING btree (item_group_id);
CREATE INDEX c_item_label ON public.c_item USING btree (label);
CREATE INDEX c_item_label_like ON public.c_item USING btree (label varchar_pattern_ops);

CREATE TABLE public.c_item_drug (
	id serial NOT NULL,
	item_id int4 NOT NULL,
	unit varchar(50) NOT NULL,
	dose float8 NULL,
	caution text NULL,
	frequency text NULL,
	instruction text NULL,
	remark text NULL,	
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT c_item_drug_item_id_key UNIQUE (item_id),
	CONSTRAINT c_item_drug_pkey PRIMARY KEY (id),
	CONSTRAINT c_item_drug_item_id_fk_c_item_id FOREIGN KEY (item_id) REFERENCES c_item(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT c_item_drug_update_by_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX c_item_drug_item_id ON public.c_item_drug USING btree (item_id);

create type result_type as enum('numeric', 'text');

CREATE TABLE public.c_item_lab (
	id serial NOT NULL,
	item_id int4 NOT NULL,
	result_type result_type NOT NULL DEFAULT 'text',
	normal_str varchar(100) NULL,
	normal_max float8 NULL,
	normal_min float8 NULL,
	unit varchar(100) NULL,
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT c_item_lab_pkey PRIMARY KEY (id),
	CONSTRAINT c_item_lab_item_id_fk_c_item_id FOREIGN KEY (item_id) REFERENCES c_item(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT c_item_lab_update_by_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX c_item_lab_item_id ON public.c_item_lab USING btree (item_id);

CREATE TABLE public.c_item_set (
	id serial NOT NULL,
	item_id int4 NOT NULL,
	item_subset_id int4 NOT NULL,
	CONSTRAINT c_item_set_pkey PRIMARY KEY (id),
	CONSTRAINT c_item_set_un UNIQUE (item_id, item_subset_id),
	CONSTRAINT c_item_set_item_id_fk_c_item_id FOREIGN KEY (item_id) REFERENCES c_item(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT c_item_set_item_subset_id_fk_c_item_id FOREIGN KEY (item_subset_id) REFERENCES c_item(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX c_item_set_item_id ON public.c_item_set USING btree (item_id);


-- transaction data