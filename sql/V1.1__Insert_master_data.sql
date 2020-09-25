INSERT INTO public."m_role"
("name")
VALUES('register'),
('doctor'),
('lab'),
('xray'),
('pharmacy'),
('cashier');

INSERT INTO t_user ("username","password","name","email","phone","is_admin","is_active") VALUES('admin','$2a$10$uoS1kYsu9b42YuIpXKkK4Oy.UuiaINNuxHzSI.oTStxyAoLJRvkv6','Administrator','admin@mail.com',null,true,true);

INSERT INTO t_user_roles ("user_id","role_id") VALUES(1,1), (1,2), (1,3), (1,4), (1,5), (1,6);

INSERT INTO c_media_type ("label","update_by") VALUES
('ทั่วไป',1), 
('CC ( Chief Complaint )',1), 
('PE ( Physical Examination )',1), 
('Lab',1), 
('Xray',1);