git pull
pm2 delete oa
pm2 start npm --watch --name oa -- run dev --port=80
