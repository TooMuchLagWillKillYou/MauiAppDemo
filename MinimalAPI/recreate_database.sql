IF DB_ID(N'RestaurantManager') IS NULL
BEGIN
    CREATE DATABASE [RestaurantManager];
END
GO

USE [RestaurantManager];
GO

IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Reservations] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [Hour] datetime2 NOT NULL,
    [People] int NOT NULL,
    [Table] nvarchar(max) NULL,
    [Notes] nvarchar(max) NULL,
    CONSTRAINT [PK_Reservations] PRIMARY KEY ([Id])
);
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Hour', N'Name', N'Notes', N'People', N'Table') AND [object_id] = OBJECT_ID(N'[Reservations]'))
    SET IDENTITY_INSERT [Reservations] ON;
INSERT INTO [Reservations] ([Id], [Hour], [Name], [Notes], [People], [Table])
VALUES (1, '2024-05-01T11:21:00.7236615+02:00', N'Mario', N'', 5, N'F2'),
(2, '2024-05-01T11:21:00.7236663+02:00', N'Rossi', N'possibimente sui divanetti', 2, N'7'),
(3, '2024-05-01T11:21:00.7236665+02:00', N'Paolo', N'', 10, N'30');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Hour', N'Name', N'Notes', N'People', N'Table') AND [object_id] = OBJECT_ID(N'[Reservations]'))
    SET IDENTITY_INSERT [Reservations] OFF;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240501092100_Initial', N'8.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DELETE FROM [Reservations]
WHERE [Id] = 1;
SELECT @@ROWCOUNT;

GO

DELETE FROM [Reservations]
WHERE [Id] = 2;
SELECT @@ROWCOUNT;

GO

DELETE FROM [Reservations]
WHERE [Id] = 3;
SELECT @@ROWCOUNT;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240714203111_TimeOnlyNew', N'8.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reservations]') AND [c].[name] = N'Hour');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Reservations] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Reservations] ALTER COLUMN [Hour] datetime2 NOT NULL;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Hour', N'Name', N'Notes', N'People', N'Table') AND [object_id] = OBJECT_ID(N'[Reservations]'))
    SET IDENTITY_INSERT [Reservations] ON;
INSERT INTO [Reservations] ([Id], [Hour], [Name], [Notes], [People], [Table])
VALUES (1, '2024-07-14T23:08:55.1422625+02:00', N'Mario', N'', 5, N'F2'),
(2, '2024-07-14T23:08:55.1422675+02:00', N'Rossi', N'possibimente sui divanetti', 2, N'7'),
(3, '2024-07-14T23:08:55.1422679+02:00', N'Paolo', N'', 10, N'30');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Hour', N'Name', N'Notes', N'People', N'Table') AND [object_id] = OBJECT_ID(N'[Reservations]'))
    SET IDENTITY_INSERT [Reservations] OFF;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240714210855_RevertToDateTime', N'8.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

UPDATE [Reservations] SET [Hour] = '2025-03-13T06:59:51.5915661+01:00'
WHERE [Id] = 1;
SELECT @@ROWCOUNT;

GO

UPDATE [Reservations] SET [Hour] = '2025-03-13T06:59:51.5915732+01:00'
WHERE [Id] = 2;
SELECT @@ROWCOUNT;

GO

UPDATE [Reservations] SET [Hour] = '2025-03-13T06:59:51.5915803+01:00'
WHERE [Id] = 3;
SELECT @@ROWCOUNT;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250313055952_PizzaEntity', N'8.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Pizzas] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [Ingredients] nvarchar(max) NOT NULL,
    [Price] decimal(18,2) NOT NULL,
    [Type] int NOT NULL,
    [Page] int NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_Pizzas] PRIMARY KEY ([Id])
);
GO

UPDATE [Reservations] SET [Hour] = '2025-03-13T07:03:09.8471455+01:00'
WHERE [Id] = 1;
SELECT @@ROWCOUNT;

GO

UPDATE [Reservations] SET [Hour] = '2025-03-13T07:03:09.8471528+01:00'
WHERE [Id] = 2;
SELECT @@ROWCOUNT;

GO

UPDATE [Reservations] SET [Hour] = '2025-03-13T07:03:09.8471534+01:00'
WHERE [Id] = 3;
SELECT @@ROWCOUNT;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250313060310_PizzaEntity2', N'8.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Pizzas]') AND [c].[name] = N'Price');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Pizzas] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [Pizzas] ALTER COLUMN [Price] money NOT NULL;
GO

DECLARE @var2 sysname;
SELECT @var2 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Pizzas]') AND [c].[name] = N'Page');
IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [Pizzas] DROP CONSTRAINT [' + @var2 + '];');
ALTER TABLE [Pizzas] ALTER COLUMN [Page] int NULL;
GO

UPDATE [Reservations] SET [Hour] = '2025-03-13T20:29:10.6991358+01:00'
WHERE [Id] = 1;
SELECT @@ROWCOUNT;

GO

UPDATE [Reservations] SET [Hour] = '2025-03-13T20:29:10.6991425+01:00'
WHERE [Id] = 2;
SELECT @@ROWCOUNT;

GO

UPDATE [Reservations] SET [Hour] = '2025-03-13T20:29:10.6991429+01:00'
WHERE [Id] = 3;
SELECT @@ROWCOUNT;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250313192911_MoneyColumnAndNullablePage', N'8.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DELETE FROM [Reservations]
WHERE [Id] = 1;
SELECT @@ROWCOUNT;

GO

DELETE FROM [Reservations]
WHERE [Id] = 2;
SELECT @@ROWCOUNT;

GO

DELETE FROM [Reservations]
WHERE [Id] = 3;
SELECT @@ROWCOUNT;

GO

ALTER TABLE [Pizzas] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250313204541_SoftDeletingPizzas', N'8.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

EXEC sp_rename N'[Pizzas].[Type]', N'Category', N'COLUMN';
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250318193456_ColumnRenameOnPizzasTables', N'8.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [Pizzas] ADD [EnglishTranslation] nvarchar(max) NOT NULL DEFAULT N'';
GO

ALTER TABLE [Pizzas] ADD [GermanTranslation] nvarchar(max) NOT NULL DEFAULT N'';
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250413182732_IngredientsTranslations', N'8.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [Pizzas] ADD [Order] int NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250421110446_PizzaOrder', N'8.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DECLARE @var3 sysname;
SELECT @var3 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Pizzas]') AND [c].[name] = N'GermanTranslation');
IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [Pizzas] DROP CONSTRAINT [' + @var3 + '];');
ALTER TABLE [Pizzas] ALTER COLUMN [GermanTranslation] nvarchar(max) NULL;
GO

DECLARE @var4 sysname;
SELECT @var4 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Pizzas]') AND [c].[name] = N'EnglishTranslation');
IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [Pizzas] DROP CONSTRAINT [' + @var4 + '];');
ALTER TABLE [Pizzas] ALTER COLUMN [EnglishTranslation] nvarchar(max) NULL;
GO

CREATE TABLE [MenuItemCategories] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_MenuItemCategories] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [MenuItemSubCategories] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_MenuItemSubCategories] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Menus] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Menus] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [MenuItems] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [Ingredients] nvarchar(max) NULL,
    [EnglishTranslation] nvarchar(max) NULL,
    [GermanTranslation] nvarchar(max) NULL,
    [FirstPrice] money NOT NULL,
    [SecondPrice] money NULL,
    [Page] int NULL,
    [Order] int NULL,
    [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit),
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NULL,
    [CategoryId] int NOT NULL,
    [SubCategoryId] int NULL,
    CONSTRAINT [PK_MenuItems] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_MenuItems_MenuItemCategories_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [MenuItemCategories] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_MenuItems_MenuItemSubCategories_SubCategoryId] FOREIGN KEY ([SubCategoryId]) REFERENCES [MenuItemSubCategories] ([Id])
);
GO

CREATE TABLE [MenuMenuItem] (
    [MenuItemsId] int NOT NULL,
    [MenusId] int NOT NULL,
    CONSTRAINT [PK_MenuMenuItem] PRIMARY KEY ([MenuItemsId], [MenusId]),
    CONSTRAINT [FK_MenuMenuItem_MenuItems_MenuItemsId] FOREIGN KEY ([MenuItemsId]) REFERENCES [MenuItems] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_MenuMenuItem_Menus_MenusId] FOREIGN KEY ([MenusId]) REFERENCES [Menus] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_MenuItems_CategoryId] ON [MenuItems] ([CategoryId]);
GO

CREATE INDEX [IX_MenuItems_SubCategoryId] ON [MenuItems] ([SubCategoryId]);
GO

CREATE INDEX [IX_MenuMenuItem_MenusId] ON [MenuMenuItem] ([MenusId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250428204804_MenuItems', N'8.0.4');
GO

COMMIT;
GO

