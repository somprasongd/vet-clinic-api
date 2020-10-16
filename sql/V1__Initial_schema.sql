-- Prefix
-- m is master data can not edit
-- c is config data create & update from admit ui
-- t is transaction data

-- master data
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

-- CREATE TABLE public.m_order_status (
-- 	id serial NOT NULL,
-- 	"label" varchar NOT NULL,
-- 	active bool NOT NULL DEFAULT true,
-- 	CONSTRAINT m_order_status_pk PRIMARY KEY (id)
-- );
-- CREATE INDEX m_order_status_active_idx ON public.m_order_status USING btree (active);

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

-- CREATE TABLE public.m_visit_treatment (
-- 	id serial NOT NULL,
-- 	"label" varchar(50) NOT NULL,
-- 	active bool NOT NULL DEFAULT true,
-- 	CONSTRAINT m_visit_treatment_pkey PRIMARY KEY (id)
-- );
-- CREATE INDEX m_visit_treatment_active_idx ON public.m_visit_treatment USING btree (active);

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
	CONSTRAINT c_user_fk FOREIGN KEY (avatar_id) REFERENCES t_upload(id)
);
CREATE INDEX c_user_active_idx ON public.c_user USING btree (active);
CREATE INDEX c_user_username_idx ON public.c_user USING btree (username);

CREATE TABLE public.c_user_roles (
	id serial NOT NULL,
	user_id int4 NOT NULL,
	role_id int4 NOT NULL,
	CONSTRAINT c_user_roles_pk PRIMARY KEY (id),
	CONSTRAINT c_user_roles_un UNIQUE (user_id, role_id),
	CONSTRAINT c_user_roles_fk FOREIGN KEY (user_id) REFERENCES c_user(id),
	CONSTRAINT c_user_roles_fk_1 FOREIGN KEY (role_id) REFERENCES m_user_role(id)
);
CREATE INDEX c_user_roles_role_id_idx ON public.c_user_roles USING btree (role_id);
CREATE INDEX c_user_roles_user_id_idx ON public.c_user_roles USING btree (user_id);

CREATE TABLE public.c_site (
	id serial NOT NULL,
	"name" varchar(255) NOT NULL,
	branch_no varchar(20) NULL,
	branch_name varchar(255) NULL,
	phone varchar(10) NULL,
	address text NULL,
	logo_id int4 NULL,
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT c_site_pk PRIMARY KEY (id),
	CONSTRAINT c_site_fk FOREIGN KEY (logo_id) REFERENCES public.t_upload(id),
	CONSTRAINT c_site_update_by_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id)
);

CREATE TABLE public.c_cc (
	id serial NOT NULL,
	code varchar(50) NOT NULL,
	"label" text NOT NULL,
	active bool NOT NULL DEFAULT true,
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT c_cc_code_436a11f8_uniq UNIQUE (code),
	CONSTRAINT c_cc_pkey PRIMARY KEY (id),
	CONSTRAINT c_cc_update_by_ac024b10_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id)
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
	CONSTRAINT c_ht_update_by_ac024b10_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id)
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
	CONSTRAINT c_pe_update_by_ac024b10_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id)
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
	CONSTRAINT c_dx_update_by_ac024b10_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id)
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
	CONSTRAINT c_item_item_group_id_fk_m_item_group_id FOREIGN KEY (item_group_id) REFERENCES m_item_group(id),
	CONSTRAINT c_item_update_by_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id)
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
	CONSTRAINT c_item_drug_item_id_fk_c_item_id FOREIGN KEY (item_id) REFERENCES c_item(id),
	CONSTRAINT c_item_drug_update_by_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id)
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
	CONSTRAINT c_item_lab_item_id_fk_c_item_id FOREIGN KEY (item_id) REFERENCES c_item(id),
	CONSTRAINT c_item_lab_update_by_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id)
);
CREATE INDEX c_item_lab_item_id ON public.c_item_lab USING btree (item_id);

CREATE TABLE public.c_item_set (
	id serial NOT NULL,
	item_id int4 NOT NULL,
	item_subset_id int4 NOT NULL,
	CONSTRAINT c_item_set_pkey PRIMARY KEY (id),
	CONSTRAINT c_item_set_un UNIQUE (item_id, item_subset_id),
	CONSTRAINT c_item_set_item_id_fk_c_item_id FOREIGN KEY (item_id) REFERENCES c_item(id),
	CONSTRAINT c_item_set_item_subset_id_fk_c_item_id FOREIGN KEY (item_subset_id) REFERENCES c_item(id)
);
CREATE INDEX c_item_set_item_id ON public.c_item_set USING btree (item_id);

CREATE TABLE public.c_counter (
	id serial NOT NULL,
	prefix varchar(2) NOT NULL,
	"date" date NOT NULL DEFAULT CURRENT_DATE,
	seq int4 NOT NULL,
	CONSTRAINT c_counter_pkey PRIMARY KEY (id)
);


-- transaction data
CREATE TABLE public.t_member (
	id serial NOT NULL,
	code varchar(15) NOT NULL,
	avatar_id int4 NULL,
	prefix_id int4 NOT NULL,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	house_no varchar(100) NULL,
	address text NULL,
	tels _varchar NULL,
	email varchar(254) NULL,
	old_hn varchar(20) NULL,
	remark text NULL,
	active bool NOT NULL DEFAULT true,
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT t_member_code_key UNIQUE (code),
	CONSTRAINT t_member_pkey PRIMARY KEY (id),
	CONSTRAINT t_member_avatar_id_fk_t_upload_id FOREIGN KEY (avatar_id) REFERENCES t_upload(id),
	CONSTRAINT t_member_prefix_id_fk_m_prefix_id FOREIGN KEY (prefix_id) REFERENCES m_prefix(id),
	CONSTRAINT t_member_update_by_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id) 
);
CREATE INDEX t_member_active ON public.t_member USING btree (active);
CREATE INDEX t_member_code_like ON public.t_member USING btree (code varchar_pattern_ops);
CREATE INDEX t_member_old_hn_like ON public.t_member USING btree (old_hn varchar_pattern_ops);
CREATE INDEX t_member_first_name ON public.t_member USING btree (first_name);
CREATE INDEX t_member_first_name_like ON public.t_member USING btree (first_name varchar_pattern_ops);
CREATE INDEX t_member_house_no ON public.t_member USING btree (house_no);
CREATE INDEX t_member_house_no_like ON public.t_member USING btree (house_no varchar_pattern_ops);
CREATE INDEX t_member_last_name ON public.t_member USING btree (last_name);
CREATE INDEX t_member_last_name_like ON public.t_member USING btree (last_name varchar_pattern_ops);
CREATE INDEX t_member_tels ON public.t_member USING btree (tels);

CREATE TABLE public.t_pet (
	id serial NOT NULL,	
	owner_id int4 NOT NULL,
	code varchar(15) NOT NULL,
	"name" varchar(50) NOT NULL,
	avatar_id int4 NULL,
	birth_date date NULL,
	breed varchar(50) NULL,
	death bool NOT NULL DEFAULT false,
	earmark varchar(50) NULL,
	color varchar(50) NULL,
	microchip_no varchar(20) NULL,
	sterilization bool NOT NULL DEFAULT false,
	gender_id int4 NOT NULL,
	type_id int4 NOT NULL,
	note text NULL,
	active bool NOT NULL DEFAULT true,
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT t_pet_code_key UNIQUE (code),
	CONSTRAINT t_pet_pkey PRIMARY KEY (id),
	CONSTRAINT t_pet_avatar_id_fk_t_upload_id FOREIGN KEY (avatar_id) REFERENCES t_upload(id),
	CONSTRAINT t_pet_owner_id_fk_t_member_id FOREIGN KEY (owner_id) REFERENCES t_member(id),
	CONSTRAINT t_pet_gender_id_fk_m_pet_gender_id FOREIGN KEY (gender_id) REFERENCES pets_sex(id),
	CONSTRAINT t_pet_type_id_fk_m_pet_type_id FOREIGN KEY (type_id) REFERENCES m_pet_type(id),
	CONSTRAINT t_pet_update_by_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id)
);
CREATE INDEX t_pet_active ON public.t_pet USING btree (active);
CREATE INDEX t_pet_code_like ON public.t_pet USING btree (code varchar_pattern_ops);
CREATE INDEX t_pet_name ON public.t_pet USING btree (name);
CREATE INDEX t_pet_name_like ON public.t_pet USING btree (name varchar_pattern_ops);
CREATE INDEX t_pet_owner_id ON public.t_pet USING btree (owner_id);

CREATE TABLE public.t_visit (
	id serial NOT NULL,
	vn varchar(15) NOT NULL,
	pet_id int4 NOT NULL,
	visit_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	visit_by int4 NOT NULL,	
	visit_type_id int4 NOT NULL DEFAULT 1, -- OPD
	visit_status_id int4 NOT NULL DEFAULT 1, -- รอตรวจ
	visit_priority_id int4 NOT NULL DEFAULT 1, -- Normal
	visit_cause text NULL,
	note text NULL,
	cc text NULL,
	dx text NULL,
	ht text NULL,
	pe text NULL,
	doctor_id int4 NULL DEFAULT NULL,	
	doctor_discharge_at timestamptz NULL,
	discharge_at timestamptz NULL,
	discharge_by int4 NULL,
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT t_visit_pkey PRIMARY KEY (id),
	CONSTRAINT t_visit_vn_key UNIQUE (vn),
	CONSTRAINT t_visit_pet_id_fk_t_pet_id FOREIGN KEY (pet_id) REFERENCES t_pet(id),
	CONSTRAINT t_visit_update_by_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id),
	CONSTRAINT t_visit_discharge_by_fk_c_user_id FOREIGN KEY (discharge_by) REFERENCES c_user(id),
	CONSTRAINT t_visit_visit_priority_id_fk_visit_priority_id FOREIGN KEY (visit_priority_id) REFERENCES m_visit_priority(id),
	CONSTRAINT t_visit_visit_status_id_fk_visit_status_id FOREIGN KEY (visit_status_id) REFERENCES m_visit_status(id),
	CONSTRAINT t_visit_visit_type_id_fk_visit_type_id FOREIGN KEY (visit_type_id) REFERENCES m_visit_type(id)
);
CREATE INDEX t_visit_pet_id ON public.t_visit USING btree (pet_id);
CREATE INDEX t_visit_doctor_id ON public.t_visit USING btree (doctor_id);
CREATE INDEX t_visit_visit_at ON public.t_visit USING btree (visit_at);
CREATE INDEX t_visit_visit_priority_id ON public.t_visit USING btree (visit_priority_id);
CREATE INDEX t_visit_visit_status_id ON public.t_visit USING btree (visit_status_id);
CREATE INDEX t_visit_visit_type_id ON public.t_visit USING btree (visit_type_id);
CREATE INDEX t_visit_vn_like ON public.t_visit USING btree (vn varchar_pattern_ops);

CREATE TABLE public.t_visit_vitalsign (
	id serial NOT NULL,
	visit_id int4 NOT NULL,
	vital_sign_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	weight float8 NULL,
	temp float8 NULL,
	rr float8 NULL, -- respiratory_rate
	sys int4 NULL, -- systolic_blood_pressure
	dia int4 NULL, -- diastolic_blood_pressure
	pulse int4 NULL,
	pain_score float8 NULL,
	bcs float8 NULL,
	active bool NOT NULL DEFAULT true,
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,	
	CONSTRAINT t_visit_vitalsign_pkey PRIMARY KEY (id),
	CONSTRAINT t_visit_vitalsign_update_by_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id),
	CONSTRAINT t_visit_vitalsign_visit_id_fk_t_visit_id FOREIGN KEY (visit_id) REFERENCES t_visit(id)
);
CREATE INDEX t_visit_vitalsign_active ON public.t_visit_vitalsign USING btree (active);
CREATE INDEX t_visit_vitalsign_visit_id ON public.t_visit_vitalsign USING btree (visit_id);
CREATE INDEX t_visit_vitalsign_vital_sign_at ON public.t_visit_vitalsign USING btree (vital_sign_at);

CREATE TABLE public.t_visit_media (
	id serial NOT NULL,
	media_type upload_type NOT NULL,
	type_id int4 NOT NULL default 1, -- general
	visit_id int4 NOT NULL,
	media_id int4 NOT NULL,
	description text NULL, 
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT t_visit_media_pk PRIMARY KEY (id),
	CONSTRAINT t_visit_media_un UNIQUE (visit_id, media_id),
	CONSTRAINT t_visit_media_fk_visit_id FOREIGN KEY (visit_id) REFERENCES t_visit(id),
	CONSTRAINT t_visit_media_fk_media_id FOREIGN KEY (media_id) REFERENCES t_upload(id),
	CONSTRAINT t_visit_media_fk_update_by FOREIGN KEY (update_by) REFERENCES c_user(id),
	CONSTRAINT t_visit_media_fk_type_id FOREIGN KEY (type_id) REFERENCES m_media_type(id)
);
CREATE INDEX t_visit_media_media_id_idx ON public.t_visit_media USING btree (media_id);
CREATE INDEX t_visit_media_visit_id_idx ON public.t_visit_media USING btree (visit_id);
CREATE INDEX t_visit_media_type_id_idx ON public.t_visit_media USING btree (type_id);

CREATE TABLE public.t_appoint (
	id serial NOT NULL,
	pet_id int4 NOT NULL,
	appoint_date date NOT NULL,
	appoint_time time NULL,
	doctor_id int4 NULL,
	cause text NULL,
	remark text NULL,
	from_visit_id int4 NULL,	
	come_visit_id int4 NULL,
	active bool NOT NULL DEFAULT true,	
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT t_appoint_pkey PRIMARY KEY (id),
	CONSTRAINT t_appoint_pet_id_fk_t_pet_id FOREIGN KEY (pet_id) REFERENCES t_pet(id),
	CONSTRAINT t_appoint_doctor_id_fk_t_pet_id FOREIGN KEY (doctor_id) REFERENCES c_user(id),
	CONSTRAINT t_appoint_update_by_fk_c_user_id FOREIGN KEY (update_by) REFERENCES c_user(id),
	CONSTRAINT t_appoint_from_visit_id_fk_t_visit_id FOREIGN KEY (from_visit_id) REFERENCES t_visit(id),
	CONSTRAINT t_appoint_come_visit_fk_t_visit_id FOREIGN KEY (come_visit_id) REFERENCES t_visit(id)
);
CREATE INDEX t_appoint_active ON public.t_appoint USING btree (active);
CREATE INDEX t_appoint_appoint_date ON public.t_appoint USING btree (appoint_date);
CREATE INDEX t_appoint_pet_id ON public.t_appoint USING btree (pet_id);
CREATE INDEX t_appoint_doctor_id ON public.t_appoint USING btree (doctor_id);

create type pos_state as enum('pending', 'active', 'success', 'cancel');

CREATE TABLE public.t_pos (
	id serial NOT NULL,
	pos_number varchar(20) NULL,
	pos_state pos_state NOT NULL DEFAULT 'active',
	remark text NULL,
	create_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT t_pos_pkey PRIMARY KEY (id)
);
CREATE INDEX t_pos_pos_state ON public.t_pos USING btree (pos_state);
CREATE INDEX t_pos_pos_number ON public.t_pos USING btree (pos_number);
CREATE INDEX t_pos_pos_number_like ON public.t_pos USING btree (pos_number varchar_pattern_ops);
CREATE INDEX t_pos_create_at ON public.t_pos USING btree (create_at);

CREATE TABLE public.t_order (
	id serial NOT NULL,
	visit_id int4 NULL,	
	pos_id int4 NULL,
	item_id int4 NOT NULL,
	item_label varchar NOT NULL,
	type_id int4 NOT NULL,
	type_label varchar NOT NULL,
	"cost" float8 NOT NULL,
	price float8 NOT NULL,
	qty float8 NOT NULL DEFAULT 1,
	active bool NOT NULL DEFAULT true,
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT t_order_pkey PRIMARY KEY (id),
	CONSTRAINT t_order_item_id_fk_c_item_id FOREIGN KEY (item_id) REFERENCES c_item(id),
	CONSTRAINT t_order_type_id_fk_m_item_group_id FOREIGN KEY (type_id) REFERENCES m_item_group(id),
	CONSTRAINT t_order_pos_id_fk_t_pos_id FOREIGN KEY (pos_id) REFERENCES t_pos(id),
	CONSTRAINT t_order_visit_id_fk_t_visit_id FOREIGN KEY (visit_id) REFERENCES t_visit(id)
);
CREATE INDEX t_order_item_id ON public.t_order USING btree (item_id);
CREATE INDEX t_order_type_id ON public.t_order USING btree (type_id);
CREATE INDEX t_order_active ON public.t_order USING btree (active);
CREATE INDEX t_order_pos_id ON public.t_order USING btree (pos_id);
CREATE INDEX t_order_visit_id ON public.t_order USING btree (visit_id);

CREATE TABLE public.t_order_drug (
	id serial NOT NULL,
	order_id int4 NOT NULL,
	unit varchar(50) NOT NULL,
	dose float8 NULL,
	caution text NULL,
	frequency text NULL,
	instruction text NULL,
	remark text NULL,	
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT t_order_drug_pkey PRIMARY KEY (id),
	CONSTRAINT t_order_drug_order_id_fk FOREIGN KEY (order_id) REFERENCES t_order(id),
	CONSTRAINT t_order_drug_update_by_fk FOREIGN KEY (update_by) REFERENCES c_user(id)
);
CREATE INDEX t_order_drug_order_id ON public.t_order_drug USING btree (order_id);

CREATE TABLE public.t_result_xray (
	id serial NOT NULL,	
	order_id int4 NOT NULL,
	xn varchar(20) NULL,
	"label" varchar(100) NOT NULL,
	"result" varchar(200) NOT NULL DEFAULT ''::character varying,
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT t_result_xray_pkey PRIMARY KEY (id),
	CONSTRAINT t_result_xray_order_id_fk FOREIGN KEY (order_id) REFERENCES t_order(id),
	CONSTRAINT t_result_xray_update_by_fk FOREIGN KEY (update_by) REFERENCES c_user(id)
);
CREATE INDEX t_result_xray_order_id ON public.t_result_xray USING btree (order_id);
CREATE INDEX t_result_xray_xn ON public.t_result_xray USING btree (xn);
CREATE INDEX t_result_xray_xn_like ON public.t_result_xray USING btree (xn varchar_pattern_ops);

CREATE TABLE public.t_result_lab (
	id serial NOT NULL,
	order_id int4 NOT NULL,
	item_id int4 NOT NULL,
	item_set_id int4 NULL,
	"label" varchar(100) NOT NULL,
	"result" varchar(200) NOT NULL DEFAULT ''::character varying,
	result_type result_type NOT NULL DEFAULT 'text',
	normal_str varchar(100) NULL,
	normal_max float8 NULL,
	normal_min float8 NULL,
	unit varchar(100) NULL,
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	interpret varchar(50) NULL,
	interpret_level int4 NULL,
	CONSTRAINT t_result_lab_pkey PRIMARY KEY (id),
	CONSTRAINT t_result_lab_order_id_fk FOREIGN KEY (order_id) REFERENCES t_order(id),
	CONSTRAINT t_result_lab_item_id_fk FOREIGN KEY (item_id) REFERENCES c_item(id),
	CONSTRAINT t_result_lab_item_set_id_fk FOREIGN KEY (item_set_id) REFERENCES c_item(id),
	CONSTRAINT t_result_lab_update_by_fk FOREIGN KEY (update_by) REFERENCES c_user(id)
);
CREATE INDEX t_result_lab_order_id ON public.t_result_lab USING btree (order_id);
CREATE INDEX t_result_lab_item_id ON public.t_result_lab USING btree (item_id);

-- Table Triggers

CREATE OR REPLACE FUNCTION public.isnumeric(text)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE x NUMERIC;
BEGIN
	x = $1::NUMERIC;
	RETURN TRUE;
EXCEPTION WHEN others THEN
  RETURN FALSE;
END;
$function$
;


CREATE OR REPLACE FUNCTION public.lab_interpret(p_min numeric, p_max numeric, p_result text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE 
  n_result numeric;
BEGIN
	IF isnumeric(p_result) THEN
		n_result = p_result::numeric;
		IF p_min > n_result  THEN 
			RETURN 'Low';
		ELSIF p_max < n_result THEN
			RETURN 'High';
		ELSE
			RETURN 'Normal';
		END IF;
	ELSE
		RETURN NULL;
	END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.lab_interpret_level(p_min numeric, p_max numeric, p_result text)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE 
	n_result numeric;
	max_min10 numeric := (p_max - p_min)/10;
BEGIN
	IF isnumeric(p_result) THEN
		n_result = p_result::numeric;
		IF p_min > n_result  THEN 
					RETURN 0;
		ELSIF p_min = n_result THEN
					RETURN 1;
		ELSIF p_min < n_result AND n_result < (p_min + (1 * max_min10)) THEN
					RETURN 2;
		ELSIF p_min <= n_result AND n_result < (p_min + (2 * max_min10)) THEN
					RETURN 3;
		ELSIF p_min <= n_result AND n_result < (p_min + (3 * max_min10)) THEN
					RETURN 4;
		ELSIF p_min <= n_result AND n_result < (p_min + (4 * max_min10)) THEN
					RETURN 5;
		ELSIF p_min <= n_result AND n_result < (p_min + (5 * max_min10)) THEN
					RETURN 6;
		ELSIF p_min <= n_result AND n_result < (p_min + (6 * max_min10)) THEN
					RETURN 7;
		ELSIF p_min <= n_result AND n_result < (p_min + (7 * max_min10)) THEN
					RETURN 8;
		ELSIF p_min <= n_result AND n_result < (p_min + (8 * max_min10)) THEN
					RETURN 9;
		ELSIF p_min <= n_result AND n_result < (p_min + (9 * max_min10)) THEN
					RETURN 10;
		ELSIF p_min <= n_result AND n_result < (p_min + (10 * max_min10)) THEN
					RETURN 11;
		ELSIF p_max = n_result  THEN
					RETURN 12;
		ELSIF p_max < n_result THEN
					RETURN 13; 
		ELSE
					RETURN NULL;
		END IF;
	ELSE
		RETURN NULL;
	END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.t_result_lab_interpret()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
	UPDATE t_result_lab SET
		interpret = case when NEW.result_type = 'numeric'
									then lab_interpret(NEW.normal_min::numeric, NEW.normal_max::numeric, NEW.result::text)
									else '' end 
	, interpret_level = case when NEW.result_type = 'numeric'
									then lab_interpret_level(NEW.normal_min::numeric,NEW.normal_max::numeric,NEW.result::text)
									else (case when (upper(trim(NEW.result)) = upper(trim(normal_str))) then 1 else 0 end) end
	WHERE id = NEW.id ; 
	RETURN new;
END;
$function$
;

create trigger t_result_lab_interpret after
update
    on
    public.t_result_lab for each row
    when (((new.result)::text <> (old.result)::text)) execute procedure t_result_lab_interpret();
