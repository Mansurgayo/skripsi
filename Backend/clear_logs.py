import sqlite3
import os
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent / 'stresslog.db'

if not DB_PATH.exists():
    print(f"Database not found: {DB_PATH}")
    raise SystemExit(1)

print(f"Clearing all rows from database: {DB_PATH}")

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

try:
    cursor.execute('DELETE FROM predictions')
    conn.commit()
    cursor.execute('VACUUM')
    conn.commit()
    print('All old prediction data has been removed.')
except sqlite3.DatabaseError as err:
    print('Database error:', err)
    conn.rollback()
finally:
    conn.close()
