# Waves API

Waves предоставляет следующие API для работы с блокчейном:

* [Node REST API](/ru/waves-node/node-api/) (описан в главе «Нода») позволяет:
   * отправить на блокчейн подписанную транзакцию;
   * получать данные об аккаунтах, токенах, транзакциях, блоках и т. д.;
   * валидировать транзакции, использовать различные утилиты и многое другое.

   Каждый владелец ноды может включить на ней REST API. Команда Waves предоставляет пулы нод с публичным API.

* [gRPC Server](/ru/waves-node/extensions/grpc-server/) (описан в главе «Нода») — расширение, которое позволяет владельцу ноды запускать на ней gRPC-сервисы. gRPC Server предоставляет информацию об аккаунтах, токенах, транзакциях и блоках, а также отправить подписанную транзакцию.

* [Waves Data Service API](/en/building-apps/waves-api-and-sdk/waves-data-service-api) предназначен для чтения данных из блокчейна, в том числе получения рыночных данных о торговле криптовалютой из транзакций обмена, списков транзакций по типу и др.

* [Waves Keeper API](/ru/ecosystem/waves-keeper/waves-keeper-api) (описан в главе «Экосистема приложений») позволяет подписывать и отправлять транзакции и биржевые ордера от имени пользователя в браузере с установленным расширением Waves Keeper.

* [Waves Signer](/ru/building-apps/waves-api-and-sdk/client-libraries/signer) — TypeScript/JavaScript-библиотека, которая предоставляет интерфейс с библиотекой-провайдером подписи и дает возможность подписывать и отправлять транзакции от имени пользователей в любом браузере.

:bulb: Список клиентских библиотек для различных языков программирования представлен в разделе [Клиентские библиотеки](/ru/building-apps/waves-api-and-sdk/client-libraries/).
