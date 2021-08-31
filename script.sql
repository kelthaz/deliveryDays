--═════════════════════════════════════════════════════════════════════════
--      LOS PASOS 1 Y 2 SE UTILIZAN PARA LLENAR EL ARCHIVO entregados.csv
--═════════════════════════════════════════════════════════════════════════

--PASO 1 - OBTIENES EL ID

select top 1 * from [farmadomicilios-history].dbo.orderstraceability where creationDate > '2021-07-31'  
order by creationDate asc

--PASO 2 - PASAS EL ID A LA CONDICION DEL WHERE

select distinct idOrder, orderStatus, creationDate 
from [farmadomicilios-history].dbo.OrdersTraceability 
where id > 28052141
and (orderStatus = 'DELIVERED' or subOrderStatus = 'DELIVERED') 
and idprovider=9

--═════════════════════════════════════════════════════════════════════════
--      EL PASO 3 SE UTILIZA PARA LLENAR EL ARCHIVO enviados.csv
--═════════════════════════════════════════════════════════════════════════

--PASO 3 - PASAS EL ID A LA CONDICION DEL WHERE

select idOrder, nitProvider, creationDate, shippingDateOrder
from LogNotificationMessages where creationDate > '2021-07-31' and creationDate < '2021-08-28' 
and nitProvider=800149695