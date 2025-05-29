const { ClientProxyFactory, Transport } = require('@nestjs/microservices');

async function main() {
  const client = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: {port: 4001},
  });

  const res = await client.send('create_order', 
    { productId: 'A12'}
  ).toPromise();

  console.log('Order Created', res);

  client.close();
}

main();
