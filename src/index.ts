const createCsvWriter = require('csv-writer').createObjectCsvWriter;
import * as moment from 'moment';
const csv = require('csv-parser');
const fs = require('fs')


getOrdersSCGOWithCSV();

// getDeliveryFromLogStatusChange();

async function getDeliveryFromLogStatusChange() {
  console.log('Starting')
  let dataToPrint = []
  let rows = []
  fs.createReadStream('statuschangeDic.csv')
    .pipe(csv({
      headers: false
    }))
    .on('data', (row) => {
      rows.push(row)
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        for (let index = 0; index < rows.length; index++) {
          console.log(index)
          const message = rows[index];
          const foundDelivery = dataToPrint.find(row => row.idOrder === message['4'])
          if (!foundDelivery) {
            let payload = JSON.parse(message['1'])
            if (payload.statusCode === 4) {
              dataToPrint.push({
                idOrder: message['4'],
                status: 'DELIVERED',
                notificationDate: message['2']
              })
            }
          }
        }
        const csvWriter = createCsvWriter({
          path: 'entregados_diciembre.csv',
          header: [
            { id: 'idOrder', title: 'idOrder' },
            { id: 'status', title: 'status' },
            { id: 'notificationDate', title: 'notificationDate' }
          ]
        });

        csvWriter
          .writeRecords(dataToPrint)
          .then(() => console.log('The CSV file was written successfully'));
    })
}

async function getOrdersSCGOWithCSV() {
  console.log('Starting')
  let delivered = []
  let sent = []
  let dataToPrint = []
  fs.createReadStream('entregados.csv')
    .pipe(csv({
       headers: false
    }))
    .on('data', (row) => {
      delivered.push(row)
    })
    .on('end', () => {
      console.log('CSV file successfully processed');

      fs.createReadStream('enviados.csv')
        .pipe(csv({
          headers: false
        }))
        .on('data', (row) => {
          sent.push(row)
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            for (let index = 0; index < sent.length; index++) {
              console.log(index)
              const order = sent[index];
              const foundDelivery = delivered.find(delivery => delivery['0'] === order['0'])
              if (foundDelivery) {
                dataToPrint.push({
                  idOrder: order['0'],
                  scheduleDate: moment(order['2']).format('YYYY-MM-DD HH:MM:SS'),
                  deliveryDate: moment(foundDelivery['2']).format('YYYY-MM-DD HH:MM:SS'),
                  diffDays: moment(foundDelivery['2']).diff(moment(order['2']), 'days'),
                  diffHours: moment(foundDelivery['2']).diff(moment(order['2']), 'hours'),
                  provider: order['1'],
                  shippingDateSelectedByUser: moment(order['3']).format('YYYY-MM-DD')
                })
              } else {
                dataToPrint.push({
                  idOrder: order['0'],
                  scheduleDate: moment(order['2']).format('YYYY-MM-DD HH:MM:SS'),
                  deliveryDate: 'NN',
                  diffDays: 'NN',
                  diffHours: 'NN',
                  provider: order['1'],
                  shippingDateSelectedByUser: moment(order['3']).format('YYYY-MM-DD')
                })
              }
            }
            const csvWriter = createCsvWriter({
              path: 'report.csv',
              header: [
                { id: 'idOrder', title: 'idOrder' },
                { id: 'scheduleDate', title: 'scheduleDate' },
                { id: 'deliveryDate', title: 'deliveryDate' },
                { id: 'diffDays', title: 'diffDays' },
                { id: 'diffHours', title: 'diffHours' },
                { id: 'provider', title: 'provider' },
                { id: 'shippingDateSelectedByUser', title: 'shippingDateSelectedByUser' }
              ]
            });
    
            csvWriter
              .writeRecords(dataToPrint)
              .then(() => console.log('The CSV file was written successfully'));
        })
    })
}

