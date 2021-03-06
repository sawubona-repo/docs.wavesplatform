# Разработка приложений на блокчейне Waves: обзор

Экосистема Waves предоставляет множество инструментов, продуктов и компонентов, которые помогут интегрировать ваше приложение с блокчейном. Этот раздел поможет сориентироваться.

Прежде чем начать, рекомендуем ознакомиться с основными понятиями:

* [Аккаунт](/ru/blockchain/account/)
* [Токен (ассет)](/ru/blockchain/token/)
* [Транзакция](/ru/blockchain/transaction/)

## API ноды

REST API ноды Waves — основной интерфейс для взаимодействия с блокчейном. Node REST API позволяет:

* отправить на блокчейн подписанную транзакцию;
* получать данные об аккаунтах, токенах, транзакциях, блоках и т. д.;
* валидировать транзакции, использовать различные утилиты и многое другое.

Вы можете использовать API пула публичных нод, предоставляемых командой Waves, или [запустить собственную ноду](/ru/waves-node/how-to-install-a-node/how-to-install-a-node) и включить на ней REST API. На своей ноде вам будут дополнительно доступны приватные методы API, такие как подписание транзакции от имени аккаунтов из кошелька ноды и инструменты отладки.

Обратите внимание: API ноды не дает возможности подписывать транзакции от имени произвольных аккаунтов. Для этого используйте клиентские библиотеки.

> [Документация Node REST API](/ru/waves-node/node-api/) в главе «Нода»

> [Все API Waves](/ru/building-apps/waves-api-and-sdk/)

## Клиентские библиотеки

Библиотеки для разных языков программирования предоставляют функции для работы с блокчейном Waves: подписания транзакций и биржевых ордеров, взаимодействия с Node REST API, генерации ключей аккаунта. Библиотеки отличаются по своим возможностям.

> [Список библиотек](/ru/building-apps/waves-api-and-sdk/client-libraries/)

## Безопасное подписание транзакций

Чтобы подписать транзакцию — например, вызов функции dApp или перевод средств, — необходим [закрытый ключ](/ru/blockchain/account/#ключи) аккаунта. Однако, если ваше приложение отправляет транзакции от имени разных пользователей, у вас нет доступа к их закрытым ключам. Владение закрытым ключом или секретной фразой позволяет делать что угодно от имени аккаунта, поэтому запрашивать их у пользователя **не следует**. Пользователям настоятельно рекомендуется никому не сообщать секретную фразу и закрытый ключ, и пользователи не доверяют сайтам и приложениям, которые требуют эти данные.

Решение проблемы — получать подпись пользователя отдельно для каждого действия от его имени. Для этого необходим интерфейс с приложением-кошельком, которое безопасно хранит ключи аккаунта на устройстве пользователя и по запросу стороннего приложения генерирует подпись транзакции. Перед подписанием пользователь может посмотреть детали транзакции, подтвердить или отклонить ее.

Следующие инструменты предоставляют такие интерфейсы:

* [API Waves Keeper](/ru/ecosystem/waves-keeper/waves-keeper-api) — использует расширение Waves Keeper, установленное в браузере пользователя. Waves Keeper — один из наиболее безопасных способов управления ключами, однако необходимость его установки может стать барьером для новых пользователей. Кроме того, Waves Keeper недоступен в мобильных браузерах.
* [Waves Signer](/ru/building-apps/waves-api-and-sdk/client-libraries/signer) — TypeScript/JavaScript-библиотека, которая работает в любом браузере. Signer позволяет подключать сторонние библиотеки-провайдеры подписи и предоставляет унифицированный интерфейс для взаимодействия с ними. Сейчас доступен один провайдер для Waves Signer — ProviderWeb, разработанный командой Waves.Exchange. В дальнейшем, когда появятся другие провайдеры, достаточно будет добавить в приложение инициализацию соответствующих библиотек и продолжать использовать те же самые функции Signer для получения подписи. Signer также обеспечивает наиболее комфортный пользовательский опыт, взаимодействие пользователя с провайдером происходит в iframe.
* [Waves SDK for Android](https://github.com/wavesplatform/WavesSDK-android) и [Waves SDK for iOS](https://github.com/wavesplatform/WavesSDK-iOS) — используют мобильное приложение Waves.Exchange, установленное на устройстве пользователя.

## Смарт-контракты

Протокол Waves предусматривает три типа смарт-контрактов:

* [dApp](/ru/building-apps/smart-contracts/what-is-a-dapp) — приложение, функции которого можно вызвать с помощью транзакции вызова скрипта. Вызываемые функции могут принимать платежи в пользу dApp и выполнять различные действия на блокчейне. Кроме того, dApp-скрипт может содержать функцию-верификатор, которая разрешает или отклоняет транзакции и ордера, отправляемые аккаунтом, в зависимости от выполнения заданных условий.
* [Смарт-аккаунт](/ru/building-apps/smart-contracts/what-is-smart-account) разрешает или отклоняет транзакции или ордера, отправляемые от имени аккаунта.
* [Смарт-ассет](/ru/building-apps/smart-contracts/what-is-smart-asset) разрешает или отклоняет транзакции с участием ассета.

Смарт-контракты Waves представляют собой скрипты на языке Ride. Ride — функциональный язык программирования, основанный на выражениях, созданный Waves специально для выполнения скриптов на блокчейне, с акцентом на безопасность и простоту разработки. [Подробнее о Ride](/ru/ride/) в главе «Ride».

## Инструменты разработчика

Онлайн-среда [Waves IDE](/ru/building-apps/smart-contracts/tools/waves-ide) оптимально подходит для начала разработки на блокчейне Waves. Кроме поддержки Ride, Waves IDE предоставляет также возможность создавать аккаунты, подписывать и отправлять транзакции, содержит библиотеку примеров.

> [Все инструменты](/ru/building-apps/smart-contracts/tools/)

## Биржа и торговля

Купить или продать токены (ассеты), выпущенные на блокчейне Waves (кроме [NFT](/ru/blockchain/token/non-fungible-token); также временно недоступна торговля смарт-ассетами), можно на бирже [Waves.Exchange](https://waves.exchange/), которая разработана сторонней командой из сообщества и является частью экосистемы Waves.

Чтобы продать или купить токены, нужно отправить ордер (заявку на покупки или продажу) на матчер — движок биржи. Управлять ордерами можно с помощью [API матчера](https://docs.waves.exchange/ru/waves-matcher/matcher-api).

Популярная JavaScript/Python/PHP-библиотека [CCXT](https://docs.waves.exchange/ru/ccxt/) для торговли криптовалютами и получения рыночных данных поддерживает Waves.Exchange, однако в ней доступны только торговые пары из [рекомендованного списка](https://marketdata.wavesplatform.com/api/v1/tickers).

Для торговли произвольными ассетами используйте клиентские библиотеки, см. примеры в разделе [Как купить или продать токены](/ru/building-apps/how-to/basic/trading).

## Чат разработчиков

Общайтесь с другими разработчиками и задавайте вопросы в [группе разработчиков](https://t.me/waves_ride_dapps_dev) Waves в Telegram.

## Ресурсы

* [Mastering Web3 with Waves](https://www.coursera.org/learn/mastering-web3-waves): практический курс на Coursera
* Инал Карданов. [Книга Waves](https://github.com/KardanovIR/waves-book/)
* [Awesome Waves](https://github.com/msmolyakov/awesome-waves): коллекция замечательных вещей для разработки на блокчейне Waves
