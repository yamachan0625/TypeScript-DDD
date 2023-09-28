DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/env.sh
echo '1.テストを起動します'
docker compose -f docker-compose.test.yml up -d
echo '2.DB準備中です...'
$DIR/wait-for-it.sh "${DATABASE_URL}" -- echo '3. DBが起動しました'
echo '4.DBのマイグレーションを行います'
npx prisma migrate dev --name init --schema='./src/Infrastructure/PostgreSQL/prisma/schema.prisma'
echo '5.テストを開始します'
jest --watch --runInBand /Infrastructure/PostgreSQL
echo '6.DBを停止します'
docker-compose -f docker-compose.test.yml rm -fsv testdb
echo '6.テストが正常に終了しました'
