import { MigrationInterface, QueryRunner } from 'typeorm';
import { query } from 'express';

export class CalcDistFunc1585842978959 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`
      /*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
      /*::                                                                         :*/
      /*::  This routine calculates the distance between two points (given the     :*/
      /*::  latitude/longitude of those points). It is being used to calculate     :*/
      /*::  the distance between two locations using GeoDataSource(TM) Products    :*/
      /*::                                                                         :*/
      /*::  Definitions:                                                           :*/
      /*::    South latitudes are negative, east longitudes are positive           :*/
      /*::                                                                         :*/
      /*::  Passed to function:                                                    :*/
      /*::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :*/
      /*::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :*/
      /*::  Worldwide cities and other features databases with latitude longitude  :*/
      /*::  are available at https://www.geodatasource.com                         :*/
      /*::                                                                         :*/
      /*::  For enquiries, please contact sales@geodatasource.com                  :*/
      /*::                                                                         :*/
      /*::  Official Web site: https://www.geodatasource.com                       :*/
      /*::                                                                         :*/
      /*::  Thanks to Kirill Bekus for contributing the source code.               :*/
      /*::                                                                         :*/
      /*::         GeoDataSource.com (C) All Rights Reserved 2019                  :*/
      /*::                                                                         :*/
      /*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

      CREATE OR REPLACE FUNCTION calculate_distance(lat1 float, lon1 float, lat2 float, lon2 float)
      RETURNS float AS $dist$
          DECLARE
              dist float = 0;
              radlat1 float;
              radlat2 float;
              theta float;
              radtheta float;
          BEGIN
              IF lat1 = lat2 OR lon1 = lon2
                  THEN RETURN dist;
              ELSE
                  radlat1 = pi() * lat1 / 180;
                  radlat2 = pi() * lat2 / 180;
                  theta = lon1 - lon2;
                  radtheta = pi() * theta / 180;
                  dist = sin(radlat1) * sin(radlat2) + cos(radlat1) * cos(radlat2) * cos(radtheta);

                  IF dist > 1 THEN dist = 1; END IF;

                  dist = acos(dist);
                  dist = dist * 180 / pi();
                  dist = dist * 60 * 1.1515;
                  dist = dist * 1.609344 * 1000;

                  RETURN dist;
              END IF;
          END;
      $dist$ LANGUAGE plpgsql;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(
      `DROP FUNCTION IF EXISTS calculate_distance(float, float, float, float)`,
    );
  }
}
