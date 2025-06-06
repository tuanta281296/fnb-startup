USE [MilkTea]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220321151807_Initial', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220322154759_AddUseRole', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220322155955_AddUseRole', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220324144042_AddUsersRole', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220403055157_AddUsers', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220403060420_AddUsers', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220415074729_AddOccupation', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220416062706_AddMasterData', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220417143622_AddMasterData', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220417144025_AddMasterData', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220417144755_AddMasterData', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220417145319_AddMasterData', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220420093727_UpdateDBARAddress', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220425145814_AddBranches', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220506043748_UpdateBranchID', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220611143929_AddProductType', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220613062014_AddUnit', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220613062256_AddUnit', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220613103035_AddPOProduct', N'5.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220613103436_AddPOProduct', N'5.0.0')
GO
INSERT [dbo].[AR_Address] ([UserID], [AddressLine], [District], [City], [Ward]) VALUES (1, N'360/10 Quang Trung', 2, 1, N'Phường 10')
INSERT [dbo].[AR_Address] ([UserID], [AddressLine], [District], [City], [Ward]) VALUES (2, N'640 Phạm Văn Bạch', 1, 1, N'Phường 11')
INSERT [dbo].[AR_Address] ([UserID], [AddressLine], [District], [City], [Ward]) VALUES (1002, N'Trường Minh Khai 1', 2, 1, N'Phường 10')
INSERT [dbo].[AR_Address] ([UserID], [AddressLine], [District], [City], [Ward]) VALUES (1003, N'Quang Trung', 2, 1, N'Phường Phú Đông')
GO
SET IDENTITY_INSERT [dbo].[Branch] ON 

INSERT [dbo].[Branch] ([Id], [BranchID], [BranchName], [Address], [Disctrict], [City], [Active]) VALUES (1, N'BQ1', N'Quán Số 1', N'Đường Âu Cơ 2', 1, 1, 1)
INSERT [dbo].[Branch] ([Id], [BranchID], [BranchName], [Address], [Disctrict], [City], [Active]) VALUES (3, N'BQ2', N'Quán Số 2', N'Đuờng Quang Trung', 1, 1, 1)
INSERT [dbo].[Branch] ([Id], [BranchID], [BranchName], [Address], [Disctrict], [City], [Active]) VALUES (4, N'BQ4', N'Quán Số 15', N'Đường Thống Nhất 1555', 1, 1, 1)
INSERT [dbo].[Branch] ([Id], [BranchID], [BranchName], [Address], [Disctrict], [City], [Active]) VALUES (5, N'BQ5', N'Quán Số 5', N'Đường Lê Văn Thị', 4, 2, 0)
INSERT [dbo].[Branch] ([Id], [BranchID], [BranchName], [Address], [Disctrict], [City], [Active]) VALUES (8, N'BQ7', N'Quán số 7', N'Đường Mã Thị Giám', 2, 1, 0)
INSERT [dbo].[Branch] ([Id], [BranchID], [BranchName], [Address], [Disctrict], [City], [Active]) VALUES (58, N'BQN', N'Quán Số 12', N'Đường Quang Trung', 2, 1, 0)
SET IDENTITY_INSERT [dbo].[Branch] OFF
GO
SET IDENTITY_INSERT [dbo].[OM_Permissions] ON 

INSERT [dbo].[OM_Permissions] ([Id], [Name], [Level], [Title], [ParentId]) VALUES (1, N'accessToECommerceModule', 1, N'eCommerce module', 0)
INSERT [dbo].[OM_Permissions] ([Id], [Name], [Level], [Title], [ParentId]) VALUES (2, N'accessToAuthModule', 1, N'Users Management module', 0)
INSERT [dbo].[OM_Permissions] ([Id], [Name], [Level], [Title], [ParentId]) VALUES (3, N'accessToMailModule', 1, N'Mail module', 0)
INSERT [dbo].[OM_Permissions] ([Id], [Name], [Level], [Title], [ParentId]) VALUES (5, N'canReadECommerceData', 2, N'Read', 1)
INSERT [dbo].[OM_Permissions] ([Id], [Name], [Level], [Title], [ParentId]) VALUES (6, N'canEditECommerceData', 2, N'Edit', 1)
INSERT [dbo].[OM_Permissions] ([Id], [Name], [Level], [Title], [ParentId]) VALUES (8, N'canDeleteECommerceData', 2, N'Delete', 1)
INSERT [dbo].[OM_Permissions] ([Id], [Name], [Level], [Title], [ParentId]) VALUES (9, N'canReadAuthData', 2, N'Read', 2)
INSERT [dbo].[OM_Permissions] ([Id], [Name], [Level], [Title], [ParentId]) VALUES (10, N'canDeleteAuthData', 2, N'Delete', 2)
INSERT [dbo].[OM_Permissions] ([Id], [Name], [Level], [Title], [ParentId]) VALUES (11, N'canReadMailData', 2, N'Read', 3)
INSERT [dbo].[OM_Permissions] ([Id], [Name], [Level], [Title], [ParentId]) VALUES (12, N'canEditMailData', 2, N'Edit', 3)
INSERT [dbo].[OM_Permissions] ([Id], [Name], [Level], [Title], [ParentId]) VALUES (13, N'canDeleteMailData', 2, N'Delete', 3)
INSERT [dbo].[OM_Permissions] ([Id], [Name], [Level], [Title], [ParentId]) VALUES (14, N'canEditAuthData', 2, N'Edit', 2)
SET IDENTITY_INSERT [dbo].[OM_Permissions] OFF
GO
SET IDENTITY_INSERT [dbo].[OM_PermissionsRole] ON 

INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (1, 1, 1)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (2, 1, 2)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (3, 1, 3)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (4, 1, 5)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (7, 1, 9)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (8, 1, 10)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (9, 1, 11)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (10, 1, 12)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (11, 1, 13)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (12, 1, 14)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (57, 1, 6)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (58, 1, 8)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (1244, 2, 1)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (1245, 2, 5)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (1246, 2, 6)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (1247, 2, 8)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (1248, 2, 2)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (1249, 2, 9)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (1250, 2, 10)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (1251, 2, 14)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (1252, 2, 3)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (1253, 2, 11)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (1254, 1023, 1)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (1255, 1023, 5)
INSERT [dbo].[OM_PermissionsRole] ([Id], [RoleID], [PermissionsID]) VALUES (1256, 1023, 6)
SET IDENTITY_INSERT [dbo].[OM_PermissionsRole] OFF
GO
SET IDENTITY_INSERT [dbo].[OM_Users] ON 

INSERT [dbo].[OM_Users] ([Id], [Username], [Password], [Email], [AccessToken], [Pic], [Fullname], [RefreshToken], [Occupation], [BranchID], [Phone]) VALUES (1, N'admin', N'password', N'admin@demo.com', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGRlbW8uY29tIiwianRpIjoiNmNiZTgzODQtNGNmYS00N2RlLWJmMDItOGNhZTA4NDFlN2ZmIiwiZXhwIjoxNjU1MzgyNzE5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDMwMiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzAyIn0.F1tGBIcI0_imYgn9C7rWLcFzxxQT7EArx5kX9aErRnY', N'Images/Users/Image-User1.jpg', N'Trần Anh Tuấn', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGRlbW8uY29tIiwianRpIjoiNmNiZTgzODQtNGNmYS00N2RlLWJmMDItOGNhZTA4NDFlN2ZmIiwiZXhwIjoxNjU1MzgyNzE5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDMwMiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzAyIn0.F1tGBIcI0_imYgn9C7rWLcFzxxQT7EArx5kX9aErRnY', N'OC1', 3, N'456669067890')
INSERT [dbo].[OM_Users] ([Id], [Username], [Password], [Email], [AccessToken], [Pic], [Fullname], [RefreshToken], [Occupation], [BranchID], [Phone]) VALUES (2, N'NQHuy95', N'123456', N'NQHuy95@gmail.com', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik5RSHV5OTVAZ21haWwuY29tIiwianRpIjoiMWI2MmIwN2YtY2VjNC00NTFkLWFmNTgtZTBiZDVlYzY3MjhiIiwiZXhwIjoxNjUyNTkyOTczLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDMwMiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzAyIn0.AnvSXIsaVIq8wpKNk6MEDoGYuotCfQE01jAnqCq4PPM', N'Images/Users/Image-User2.jpg', N'Nguyễn Quang Huy Chó', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik5RSHV5OTVAZ21haWwuY29tIiwianRpIjoiMWI2MmIwN2YtY2VjNC00NTFkLWFmNTgtZTBiZDVlYzY3MjhiIiwiZXhwIjoxNjUyNTkyOTczLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDMwMiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzAyIn0.AnvSXIsaVIq8wpKNk6MEDoGYuotCfQE01jAnqCq4PPM', N'OC2', 1, N'01653894132')
INSERT [dbo].[OM_Users] ([Id], [Username], [Password], [Email], [AccessToken], [Pic], [Fullname], [RefreshToken], [Occupation], [BranchID], [Phone]) VALUES (1002, N'NTTrung96', N'password', N'NTTrung96@gmail.com', N'access-token-8f3ae836da744329a6f93bf20594b5cc', N'Images/Users/Image-User1002.jpg', N'Nguyễn Thanh Trung', N'access-token-f8c137a2c98743f48b643e71161d90aa', N'OC3', 8, N'0316471131')
INSERT [dbo].[OM_Users] ([Id], [Username], [Password], [Email], [AccessToken], [Pic], [Fullname], [RefreshToken], [Occupation], [BranchID], [Phone]) VALUES (1003, N'HoaiMy96', N'password', N'HoaiMy96@gmail.com', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkhvYWlNeTk2QGdtYWlsLmNvbSIsImp0aSI6IjRlYWM1Y2E2LTRmMmItNDVhNi1iZmViLWRhZjdjM2UyZWE5MyIsImV4cCI6MTY0OTY2NDgzMiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMDIiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDMwMiJ9.fVLe87hK1S1oTSpOjNrAOItkRj9nWuPjxbGy_pHUKbc', N'Images/Users/Image-User1003.jpg', N'Đỗ Hoài Mỹ', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkhvYWlNeTk2QGdtYWlsLmNvbSIsImp0aSI6IjRlYWM1Y2E2LTRmMmItNDVhNi1iZmViLWRhZjdjM2UyZWE5MyIsImV4cCI6MTY0OTY2NDgzMiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMDIiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDMwMiJ9.fVLe87hK1S1oTSpOjNrAOItkRj9nWuPjxbGy_pHUKbc', N'OC2', 1, N'0314143146')
SET IDENTITY_INSERT [dbo].[OM_Users] OFF
GO
SET IDENTITY_INSERT [dbo].[OM_UsersAddRole] ON 

INSERT [dbo].[OM_UsersAddRole] ([Id], [UserID], [RoleID]) VALUES (1, 1, 1)
INSERT [dbo].[OM_UsersAddRole] ([Id], [UserID], [RoleID]) VALUES (1019, 1003, 3)
INSERT [dbo].[OM_UsersAddRole] ([Id], [UserID], [RoleID]) VALUES (1020, 1002, 2)
INSERT [dbo].[OM_UsersAddRole] ([Id], [UserID], [RoleID]) VALUES (1021, 2, 1023)
SET IDENTITY_INSERT [dbo].[OM_UsersAddRole] OFF
GO
SET IDENTITY_INSERT [dbo].[OM_UsersRole] ON 

INSERT [dbo].[OM_UsersRole] ([Id], [Title], [IsCoreRole]) VALUES (1, N'Administrator', 1)
INSERT [dbo].[OM_UsersRole] ([Id], [Title], [IsCoreRole]) VALUES (2, N'Warehouse1', 0)
INSERT [dbo].[OM_UsersRole] ([Id], [Title], [IsCoreRole]) VALUES (3, N'Users', 0)
INSERT [dbo].[OM_UsersRole] ([Id], [Title], [IsCoreRole]) VALUES (1023, N'Sales', 0)
SET IDENTITY_INSERT [dbo].[OM_UsersRole] OFF
GO
SET IDENTITY_INSERT [dbo].[PO_Product] ON 

INSERT [dbo].[PO_Product] ([Id], [ProductTypeID], [ProductID], [ProductName], [Image], [DefaultUnit], [DefaultPrice], [Active]) VALUES (1, 1, N'PRD001', N'Hộp Sửa Bò Hương Vị Bò', N'Images/Product/PRD001.jpg', 1, 500000, 1)
INSERT [dbo].[PO_Product] ([Id], [ProductTypeID], [ProductID], [ProductName], [Image], [DefaultUnit], [DefaultPrice], [Active]) VALUES (2, 1, N'PRD002', N'Chai Soda', N'Images/Product/PRD002.jpg', 2, 100000, 1)
INSERT [dbo].[PO_Product] ([Id], [ProductTypeID], [ProductID], [ProductName], [Image], [DefaultUnit], [DefaultPrice], [Active]) VALUES (3, 1, N'PRD003', N'Sirô Trinh hương dâu 350ml', N'Images/Product/PRD003.jpg', 2, 41000, 1)
SET IDENTITY_INSERT [dbo].[PO_Product] OFF
GO
SET IDENTITY_INSERT [dbo].[PO_ProductType] ON 

INSERT [dbo].[PO_ProductType] ([Id], [Code], [Descr]) VALUES (1, N'NL1', N'Nguyên Liệu Thô')
INSERT [dbo].[PO_ProductType] ([Id], [Code], [Descr]) VALUES (2, N'NL2', N'Nguyên Liệu Sản Xuất')
SET IDENTITY_INSERT [dbo].[PO_ProductType] OFF
GO
SET IDENTITY_INSERT [dbo].[SI_City] ON 

INSERT [dbo].[SI_City] ([Id], [Code], [Descr]) VALUES (1, N'HCM', N'TP Hồ Chí Minh')
INSERT [dbo].[SI_City] ([Id], [Code], [Descr]) VALUES (2, N'HN', N'TP Hà Nội')
INSERT [dbo].[SI_City] ([Id], [Code], [Descr]) VALUES (3, N'DL', N'TP Đà Lạt')
SET IDENTITY_INSERT [dbo].[SI_City] OFF
GO
SET IDENTITY_INSERT [dbo].[SI_District] ON 

INSERT [dbo].[SI_District] ([Id], [Code], [Descr], [CityId]) VALUES (1, N'Q1', N'Quận 1', 1)
INSERT [dbo].[SI_District] ([Id], [Code], [Descr], [CityId]) VALUES (2, N'QGV', N'Quận Gò Vấp', 1)
INSERT [dbo].[SI_District] ([Id], [Code], [Descr], [CityId]) VALUES (3, N'QPN', N'Quận Phú Nhuận', 1)
INSERT [dbo].[SI_District] ([Id], [Code], [Descr], [CityId]) VALUES (4, N'BD', N'Ba Đình', 2)
INSERT [dbo].[SI_District] ([Id], [Code], [Descr], [CityId]) VALUES (5, N'HK', N'Hoàn Kiếm', 2)
INSERT [dbo].[SI_District] ([Id], [Code], [Descr], [CityId]) VALUES (6, N'LD', N'Lâm Đồng', 3)
SET IDENTITY_INSERT [dbo].[SI_District] OFF
GO
SET IDENTITY_INSERT [dbo].[SI_Occupation] ON 

INSERT [dbo].[SI_Occupation] ([Id], [Occupation], [Descr]) VALUES (1, N'OC1', N'NV Hệ Thống')
INSERT [dbo].[SI_Occupation] ([Id], [Occupation], [Descr]) VALUES (2, N'OC2', N'Nhân Viên Bán Hàng')
INSERT [dbo].[SI_Occupation] ([Id], [Occupation], [Descr]) VALUES (3, N'OC3', N'Nhân Viên Kho')
SET IDENTITY_INSERT [dbo].[SI_Occupation] OFF
GO
SET IDENTITY_INSERT [dbo].[SI_Unit] ON 

INSERT [dbo].[SI_Unit] ([Id], [UnitType], [UnitID], [UnitName], [Active]) VALUES (1, N'PR', N'PR1', N'HOP', 1)
INSERT [dbo].[SI_Unit] ([Id], [UnitType], [UnitID], [UnitName], [Active]) VALUES (2, N'PR', N'PR2', N'CHAI', 1)
SET IDENTITY_INSERT [dbo].[SI_Unit] OFF
GO
