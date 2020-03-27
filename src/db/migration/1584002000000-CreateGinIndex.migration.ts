import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGinIndex1584002000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION make_tsvector(
          name_uk TEXT, name_ru TEXT, name_en TEXT, 
          description_uk TEXT, description_ru TEXT, description_en TEXT
        )
        RETURNS tsvector AS $$
      BEGIN
        RETURN (
          setweight(to_tsvector('russian', name_uk),'A') ||
          setweight(to_tsvector('russian', name_ru),'A') ||
          setweight(to_tsvector('russian', name_en),'A') ||
          setweight(to_tsvector('russian', description_uk),'B') ||
          setweight(to_tsvector('russian', description_ru),'B') ||
          setweight(to_tsvector('russian', description_en), 'B'));
      END
      $$ LANGUAGE 'plpgsql' IMMUTABLE;
    `);
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION make_query_tsvector(name TEXT, description TEXT)
        RETURNS tsvector AS $$
      BEGIN
        RETURN (
          setweight(to_tsvector('russian', name),'A') ||
          setweight(to_tsvector('russian', description), 'B'));
      END
      $$ LANGUAGE 'plpgsql' IMMUTABLE;
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_fts_point_entity;
      CREATE INDEX IF NOT EXISTS idx_fts_point_entity ON point_entity
      USING gin(make_tsvector(name_uk, name_ru, name_en, description_uk, description_ru, description_en));
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_fts_path;
      CREATE INDEX IF NOT EXISTS idx_fts_path ON path
      USING gin(make_tsvector(name_uk, name_ru, name_en, description_uk, description_ru, description_en));
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_fts_guide;
      CREATE INDEX IF NOT EXISTS idx_fts_guide ON guide
      USING gin(make_tsvector(name_uk, name_ru, name_en, description_uk, description_ru, description_en));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP INDEX IF EXISTS idx_fts_point_entity, idx_fts_path, idx_fts_guide`);
    await queryRunner.query(`DROP FUNCTION IF EXISTS make_tsvector(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT)`);
  }
}
