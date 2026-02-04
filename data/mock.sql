INSERT INTO
    page_stats (path, month, visits)
VALUES
    ("/", "2025-01", 8),
    ("/", "2025-02", 13),
    ("/", "2025-03", 6),
    ("/", "2025-04", 12),
    ("/", "2025-05", 13),
    ("/", "2025-06", 9),
    ("/", "2025-07", 2),
    ("/", "2025-08", 6),
    ("/", "2025-09", 10),
    ("/", "2025-10", 11),
    ("/", "2025-11", 5),
    ("/", "2025-12", 7) ON CONFLICT DO NOTHING;

INSERT INTO
    page_stats (path, month, visits)
VALUES
    ("/about", "2025-01", 2),
    ("/about", "2025-02", 3),
    ("/about", "2025-03", 1),
    ("/about", "2025-04", 4),
    ("/about", "2025-05", 6),
    ("/about", "2025-06", 7),
    ("/about", "2025-07", 5),
    ("/about", "2025-08", 2),
    -- 2025-09 is missing on purpose: no visits that month
    ("/about", "2025-10", 3),
    ("/about", "2025-11", 1),
    ("/about", "2025-12", 1) ON CONFLICT DO NOTHING;
