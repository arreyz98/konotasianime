@echo off

REM Pindah ke folder penyimpanan backup
cd /d "E:\Project Next JS\NeonBackups"

REM Set password untuk Neon DB
SET PGPASSWORD=npg_UGB0zSKwqoh9

REM Jalankan pg_dump
pg_dump -h ep-old-hall-a1ngpt8c-pooler.ap-southeast-1.aws.neon.tech -U neondb_owner -d neondb -Fc -f norinime_backup.dump

REM Cek hasil
IF %ERRORLEVEL% EQU 0 (
    echo ✅ Backup berhasil! File disimpan di: %CD%\neon_backup.dump
) ELSE (
    echo ❌ Backup gagal. Periksa koneksi, credential, atau izin folder.
)

pause
