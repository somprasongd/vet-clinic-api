INSERT INTO public."m_media_type"
("label")
VALUES('ประวัติการรักษา');

CREATE TABLE public.t_pet_media (
	id serial NOT NULL,
	media_type upload_type NOT NULL,
	type_id int4 NOT NULL default 6, -- ประวัติการรักษา
	pet_id int4 NOT NULL,
	media_id int4 NOT NULL,
	description text NULL, 
	update_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_by int4 NOT NULL,
	CONSTRAINT t_pet_media_pk PRIMARY KEY (id),
	CONSTRAINT t_pet_media_un UNIQUE (pet_id, media_id),
	CONSTRAINT t_pet_media_fk_pet_id FOREIGN KEY (pet_id) REFERENCES t_pet(id),
	CONSTRAINT t_pet_media_fk_media_id FOREIGN KEY (media_id) REFERENCES t_upload(id),
	CONSTRAINT t_pet_media_fk_update_by FOREIGN KEY (update_by) REFERENCES c_user(id),
	CONSTRAINT t_pet_media_fk_type_id FOREIGN KEY (type_id) REFERENCES m_media_type(id)
);
CREATE INDEX t_pet_media_media_id_idx ON public.t_pet_media USING btree (media_id);
CREATE INDEX t_pet_media_pet_id_idx ON public.t_pet_media USING btree (pet_id);
CREATE INDEX t_pet_media_type_id_idx ON public.t_pet_media USING btree (type_id);