INSERT INTO public."m_appoint_type"
("label")
VALUES('ติดตามอาการ'),
('ทำหมัน');

INSERT INTO public."m_item_group"
("label")
VALUES('ยา'),
('เวชภัณฑ์ทางการแพทย์'),
('Lab'),
('X-Ray'),
('ค่าบริการ');

INSERT INTO public."m_item_lab_group"
("label")
VALUES('เคมีคลินิก (Clinical Chemistry)'),
('โลหิตวิทยา (Hematology)'),
('จุลชีววิทยา (Microbiology)');

INSERT INTO public."m_media_type"
("label")
VALUES('ทั่วไป'),
('CC ( Chief Complaint )'),
('PE ( Physical Examination )'),
('Lab'),
('Xray');

INSERT INTO public."m_payment_type"
("label")
VALUES('เงินสด'),
('โอนเงิน'),
('เครดิตการ์ด');

INSERT INTO public."m_credit_card_issuer"
("label")
VALUES('Master Card'),
('Visa'),
('อื่นๆ');

INSERT INTO public."m_credit_card_fees_method"
("label")
VALUES('คิดรวมในยอดขาย'),
('คิดเพิ่มจากยอดขาย');

INSERT INTO public."m_prefix"
("label")
VALUES('คุณ'),
('นาย'),
('นางสาว'),
('นาง');

INSERT INTO public."m_pet_gender"
("label")
VALUES('ผู้'),
('เมีย');

INSERT INTO public."m_pet_type"
("label")
VALUES('สุนัข'),
('แมว'),
('กระต่าย'),
('นก'),
('ไก่'),
('หนู'),
('กระรอก'),
('สัตว์ปีก'),
('ชูการ์ไรเดอร์');

INSERT INTO public."m_user_role"
("label")
VALUES('register'),
('doctor'),
('lab'),
('xray'),
('pharmacy'),
('cashier'),
('report');

INSERT INTO public."m_visit_cause"
("label")
VALUES('ดูอาการ'),
('ทำแผล'),
('ฟังผลตรวจ Lab'),
('ฉีดยา'),
('ให้น้ำเกลือ'),
('x-ray/Ultrasound'),
('อื่น ๆ');

INSERT INTO public."m_visit_priority"
("label")
VALUES('ธรรมดา'),
('นัดหมาย'),
('ฉุกเฉิน-ระดับ 1'),
('ฉุกเฉิน-ระดับ 2'),
('ฉุกเฉิน-ระดับ 3');

INSERT INTO public."m_visit_status"
("label")
VALUES('รอตรวจ'),
('ตรวจรักษา'),
('รอผลตรวจ'),
('รายงานผล'),
('รอรับยา'),
('รอชำระเงิน'),
('จบการรับบริการ'),
('ยกเลิก'),
('ฝากเลี้ยง');

INSERT INTO public."m_visit_type"
("label")
VALUES('OPD'),
('IPD'),
('ฝากเลี้ยง');

INSERT INTO public.c_user ("username","password","name","email","phone","is_admin","active") VALUES('admin','$2a$10$uoS1kYsu9b42YuIpXKkK4Oy.UuiaINNuxHzSI.oTStxyAoLJRvkv6','Administrator','admin@mail.com',null,true,true);

INSERT INTO public.c_user_roles ("user_id","role_id") VALUES(1,1), (1,2), (1,3), (1,4), (1,5), (1,6), (1,7);

INSERT INTO public.c_site
("name", branch_no, branch_name, phone, address, update_by)
VALUES('Demo Vet Clinic', '00000', 'สำนักงานใหญ่', '076611229', '1/123 ม.0 ต.วิชิต อ.เมือง จ.ภูเก็ต 83000', 1);

INSERT INTO public.c_item
("code", "label", item_group_id, update_by, "cost", price)
VALUES('SVC-001', 'ค่ารับฝากเลี้ยง', 5, 1, 0, 300);
