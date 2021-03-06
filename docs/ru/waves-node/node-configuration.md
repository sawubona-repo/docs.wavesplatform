---
sidebarDepth: 2
---

# Конфигурация ноды

Параметры [ноды](/ru/blockchain/node/) Waves находятся в **файле конфигурации** (*.conf). Система использует формат HOCON (Human-Optimized Config Object Notation), который обеспечивает простой синтаксис и возможность использовать комментарии. [Подробнее про HOCON](https://github.com/lightbend/config/blob/master/HOCON.md). См. [стандартный файл конфигурации](https://github.com/wavesplatform/Waves/blob/master/node/src/main/resources/application.conf) для справки и изучения примеров использования параметров.

Файл конфигурации ноды расположен в [основной папке приложения по умолчанию](#основная-папка-приложения-по-умолчанию).

## Обязательные параметры

В большинстве случаев, например, при установке новой ноды с нуля, можно использовать параметры в файле конфигурации по умолчанию, однако следует задать следующие обязательные параметры, уникальные для вашей ноды:

* [waves.wallet.seed](#seed)
* [waves.wallet.password](#password)
* [waves.network.declared-address](#declared-address)
* [waves.network.node-name](#node-name)
* [waves.rest-api.api-key-hash](#api-key-hash) (для использования API ноды)

## Изменение параметров JAR-ноды

У jar-нод файл конфигурации `.conf` со стандартными параметрами встроен в jar-файл. Для изменения стандартных настроек jar-ноды, передайте путь к измененному файлу конфигурации в командной строке при запуске ноды. В файле должны быть заданы [обязательные параметры](#обязательные-параметры) описывающие уникальные характеристики вашей ноды, а также [параметры блокчейна](#настроики-блокчеина).

Используйте следующую команду (замените `{*}` на реальное имя файла):

```bash
java -jar {*}.jar {*}.conf
```

## Секции файла конфигурации

Файл конфигурации ноды содержит параметры, сгруппированные в следующие секции:

| Секция         | Описание                                                   |
|-----------------|---------------------------------------------------------------|
| [waves](#настроики-waves)| Основные параметры ноды и вложенные секции |
| &nbsp; &nbsp; &nbsp; db              | Параметры базы данных блокчейна                                |
| &nbsp; &nbsp; &nbsp; [network](#настроики-сети)| Параметры сети P2P |                               |
| &nbsp; &nbsp; &nbsp; [wallet](#настроики-кошелька)| Параметры встроенного кошелька ноды                               |
| &nbsp; &nbsp; &nbsp; [blockchain](#настроики-блокчеина)| Параметры блокчейна                                         |
| &nbsp; &nbsp; &nbsp; [miner](#настроики-генератора-блоков)| Параметры генератора блока                                   |
| &nbsp; &nbsp; &nbsp; [rest-api](#настроики-rest-api)        | Параметры API ноды                                           |
| &nbsp; &nbsp; &nbsp; [synchronization](#настроики-синхронизации) | Параметры синхронизации ноды                               |
| &nbsp; &nbsp; &nbsp; [utx](#настроики-utx-пула)| Параметры пула неподтвержденных транзакций                      |
| &nbsp; &nbsp; &nbsp; [features](#настроики-фич)        | Параметры фич                                           |
| &nbsp; &nbsp; &nbsp; [rewards](#настроики-вознаграждения)| Параметры вознаграждений                                            |
| &nbsp; &nbsp; &nbsp; extensions| Параметры расширений                                            |
| kamon           | Параметры метрик производительности                                 |
| metrics         | Параметры метрик блоков, транзакций и др. информации        |

### Настройки Waves

Корневая секция `waves` содержит базовые параметры ноды и вложенные секции.

С помощью параметра `directory` можно назначить путь к основной папке приложения. В настройках параметров конфигурации можно использовать переменные среды (environment variables). Пожалуйста, не заключайте переменные среды в кавычки: в этом случае они будут обработаны как строки и не будут применены.

> После обновления до версии 1.0.2 обратите внимание, что если ваш файл `/etc/waves/waves.conf` был изначально скопирован из шаблона, то следует убедиться, что параметр `waves.directory` задан верно. Если параметр не задан, то будет использоваться стандартный путь. П

Убедитесь, что для выбранной папки корректно указан владелец: `waves` `waves-testnet` или `waves-stagenet` для mainnet, testnet или stagenet.

#### Основная папка приложения по умолчанию

Следующие пути используются по умолчанию, если параметр `directory` не задан в файле конфигурации.

Для нод, установленных из deb-пакета:

| | *nix |
| :--- | :--- |
| Mainnet | `/var/lib/waves` |
| Testnet | `/var/lib/waves-testnet` |
| Stagenet| `/var/lib/waves-stagenet` |

Для ноды, установленной из JAR-файла, в зависимости от операционной системы и типа блокчейна:

| | *nix | macOS | Windows |
| :--- | :--- | :--- | :--- |
| Mainnet | `$XDG_DATA_HOME/waves-mainnet` или `$HOME/.local/share/waves-mainnet` | `$HOME/Library/Application Support/waves-mainnet` | `%LOCALAPPDATA%/waves-mainnet` |
| Testnet | `$XDG_DATA_HOME/waves-testnet` или `$HOME/.local/share/waves-testnet` | `$HOME/Library/Application Support/waves-testnet` | `%LOCALAPPDATA%/waves-testnet` |
| Stagenet | `$XDG_DATA_HOME/waves-stagenet` или `$HOME/.local/share/waves-stagenet` | `$HOME/Library/Application Support/waves-stagenet` | `%LOCALAPPDATA%/waves-stagenet` |
| Custom | `$XDG_DATA_HOME/waves-custom-<character>*` или `$HOME/.local/share/waves-custom-<character>*` | `$HOME/Library/Application Support/waves-custom-<character>*` | `%LOCALAPPDATA%/waves-custom-<character>*` |

\* См. описание параметра `address-scheme-character` в секции [Настройка собственного блокчейна](#custom).

**Примечание**: необходимо указать количество байт для установки параметра размера кэша. Но вы можете использовать единицы измерения: <ul><li>K — килобайт</li><li>M — мегабайт</li><li>G — гигабайт</li></ul>

### Настройки сети

В секции `network` можно настроить параметры сети P2P.

| Имя | Описание | Значение по умолчанию |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `file` | Путь базы данных, где нода хранит списки известных и занесенных в черный список peer-нод | `${waves.directory}"/peers.dat` По умолчанию путь формируется относительно основной папки приложения, заданной параметром `directory` в секции `waves`.                                                                                                                                 |
| `declared-address`            | <a name="declared-address"></a> IP адрес и порт (`address:port`), который передается во время рукопожатия (handshake).<br> <br>• Может быть задан автоматически, если [UPnP](#upnp) включен. Если `declared-address` не задан и UPnP включен, нода попытается подключиться к IGD (Internet Gateway Device), получить его внешний IP адрес и настроить шлюз для передачи трафика. Если у ноды это получится, то внешний IP адрес IGD будет задан в качестве значения параметра `declared-address`.<br> <br>• Если `declared-address` задан, а UPnP выключен, нода будет принимать входящие подключения на `bind-address:port` и передавать заданный `declared-address` пирам.<br> <br>• Если `declared-address` не задан и UPnP выключен, нода не будет принимать входящие подключения.<br> <br>• В некоторых случаях, хотя такой тип настройки не рекомендуется использовать, вы можете задать `declared-address` и включить UPnP (например когда IGD не может определить свой внешний IP адрес), чтобы нода попыталась настроить IGD для передачи трафика с внешнего порта на `bind-address:port`. | `1.2.3.4:6863` |
| `bind-address`                | IP-адрес локального сетевого интерфейса, на котором нода будет принимать входящие соединения | По умолчанию нода привязана к `0.0.0.0`: это значит, что она будет принимать соединения на всех доступных сетевых адаптерах.                                                                                                                  |
| `port`                        | Номер сетевого порта, к которому будут подключаться другие ноды Waves. Убедитесь, что порт доступен извне, иначе ваша нода будет подключаться к сети P2P только через исходящие соединения. Если этот порт занят другим приложением, ваша нода не запустится. |                                                                                                                                                                                                                       |
| `node-name`                   | <a name="node-name"></a> Имя вашей ноды, видимое для других участников P2P-сети. Передается во время первоначального рукопожатия (handshake) | По умолчанию этот параметр закомментирован, а имя ноды генерируется случайным образом.                                                                                                                                                                                                                                                                              |
| `nonce`                       |Значение, которое отправляется во время рукопожатия. Используется для различения нод, подключенных с одного IP-адреса | По умолчанию параметр не задан и значение генерируется случайным образом.                                                                                                                                                                     |
| `known-peers`                 | Список peer-нод, к которым ваша нода будет устанавливать исходящие соединения при инициализации.                                                                                                                                                      |                                                                                                                                                                                   |
| `peers-data-residence-time`   | Время, в течение которого нода хранит информацию о peer-ноде с момента последнего сеанса связи с ней.                                                                                                                       |                                                                                                                                                                                                                       |
| `black-list-residence-time`   | Время, в течение которого нода хранит информацию о peer-ноде, помещенной в черный список.                                                                                                                                                            |                                                                                                                                                                                                                       |
| `max-inbound-connections`     | Максимальное количество одновременных входящих соединений, обрабатываемых нодой.                                                                                                                                                                                             |                                                                                                                                                                                                                       |
| `max-outbound-connections`    | Максимальное количество исходящих сетевых подключений.                                                                                                                                                                                                               |                                                                                                                                                                                                                       |
| `max-single-host-connections` | Разрешенное количество сетевых подключений с&nbsp;одного IP-адреса.                                                                                                                                                                                  |                                                                                                                                                                                                                       |
| `connection-timeout`          | Таймаут сетевого подключения.                                                                                                                                                                                                           |                                                                                                                                                                                                                       |
| `outbound-buffer-size`        | Размер сетевого буфера. Лучше оставить значение по умолчанию, неправильный размер буфера может привести к неисправности ноды.                                                                                                                                      |                                                                                                                                                                                                                       |
| `max-unverified-peers`        | Максимальный размер буфера для хранения информации о peer-нодах во время процесса установления связи.                                                                                                                                                                          |                                                                                                                                                                                                                       |
| `enable-peers-exchange`       | Включение/отключение запрашивания и отправки информации о peer-нодах.                                                                                                                                                                                                      |                                                                                                                                                                                                                       |
| `enable-blacklisting`         | Включение/отключение черного списка peer-нод.                                                                                                                                                                                                                 |                                                                                                                                                                                                                       |
| `peers-broadcast-interval`    | Интервал между передачей списка известных peer-нод на другие ноды.                                                                                                                                                                                   |                                                                                                                                                                                                                       |
| `handshake-timeout`           | Время ожидания ответа при рукопожатии. В случае отсутствия ответа peer-нода будет занесена в черный список.                                                                                                                                                           |                                                                                                                                                                                                                       |
| `upnp`                        | <a name="upnp"></a> Секция с параметрами UPnP. Эти настройки полезны только в том случае, если вы запускаете свою ноду в сети, где она может попросить маршрутизатор (Internet Gateway Device) установить туннель.                                                                                     | По умолчанию эта функция отключена. Для включения задайте значение `yes` для параметра `enable`.                                                                                                           |
| `traffic-logger`              | Включение/отключение логирования некоторых входящих или исходящих сетевых сообщений. Сетевые сообщения регистрируются на уровне TRACE.                                                                                                                                  |                                                                                                                                                                                                                       |

**Примечание:** все параметры с промежутками времени задаются в миллисекундах либо с использованием единиц измерения:
<ul><li>s — секунды</li><li>m — минуты</li><li>h — часы</li><li>d — дни</li></ul>

С примерами применения можно ознакомиться в [стандартном файле конфигурации](https://github.com/wavesplatform/Waves/blob/master/node/src/main/resources/application.conf).

### Настройки кошелька

В секции  `wallet` можно настроить параметры [кошелька ноды](/ru/waves-node/how-to-work-with-node-wallet).

| Имя | Описание | Значение по умолчанию |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| `file` | Путь к файлу кошелька ноды | По умолчанию путь формируется относительно основной папки приложения |
| `password` | <a name="password"></a> Пароль для защиты файла кошелька ноды.                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                                                                            |
| `seed`     | <a name="seed"></a> Секретная (seed) фраза в кодировке base58. Этот параметр используется для воссоздания существующего кошелька на новой ноде. Если у вас нет кошелька, закомментируйте этот параметр и запустите ноду. Во время первого запуска приложение создаст для вас новый кошелек со случайной секретной фразой. В этом случае секретная фраза будет отображаться в логе приложения. Если вы пропустили ее или не хотите проверять логи, секретную фразу можно получить с помощью метода `GET wallet/seed` Node REST API. |                                                                                            |

**Внимание:** кошелек является важнейшей частью вашей ноды. Лучше создать его файл в безопасном и защищенном месте. Не забудьте сделать резервную копию файла кошелька. Рекомендуется удалить секретную фразу из файла конфигурации сразу после запуска ноды. Если злоумышленник получит доступ к секретной фразе, он получит доступ к вашим средствам на всех ваших адресах!

### Настройки блокчейна

В секции `blockchain` можно задать тип блокчейна или настроить собственный (custom) блокчейн.

| Имя | Описание | Значение по умолчанию |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `max-transactions-per-block-diff` | Количество транзакций, которые будут храниться в памяти перед сохранением на диск. Уменьшение этого значения может увеличить количество операций записи на диск | |
| `min-blocks-in-memory` | Минимальное количество блоков, которые будут храниться в памяти | |
| `type` | Тип блокчейна: TESTNET, MAINNET, STAGENET и CUSTOM. Для MAINNET, TESTNET и STAGENET параметры блокчейна встроены в приложение, поэтому дополнительная настройка не требуется. [Стандартные параметры для различных типов блокчейна](https://github.com/wavesplatform/Waves/blob/47073206c4b5c7a7302945d9a68c201becd84426/node/src/main/resources/network-defaults.conf). При выборе сети CUSTOM необходимо задать параметры в секции `custom` | |

#### Настройка собственного (custom) блокчейна <a id="custom"></a>

Секция `custom` позволяет задать параметры [собственного блокчейна](/ru/waves-node/private-waves-network).

| Имя | Описание | Значение по умолчанию |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `address-scheme-character` | Символ, используемый при создании адреса, а также для передачи по сети во время рукопожатия, что позволяет нодам не подключаться к нодам из других сетей блокчейна | |
| `functionality` | Временные метки активации различных валидаций блокчейна. Лучше установить все настройки в 0 для активации всех валидаций | |
| `genesis` | Параметры блока генезиса | |
| `block-timestamp` | Дата и время создания блока генезиса | |
| `timestamp` | Дата и время создания транзакций генезиса |               |
| `signature` | Подпись блока генезиса |               |
| `initial-balance` | Первоначальное количество токенов. Это значение следует задавать в минимальных неделимых единицах криптовалюты | |
| `average-block-delay` | Скорость генерации блока в блокчейне. Это целевой период времени между блоками. На самом деле задержки между блоками могут варьироваться | |
| `transactions` | Список первых транзакций. Каждая транзакция содержит адрес получателя в кодировке base58 и количество токена. Весь начальный баланс нужно распределить по одному или нескольким адресам в блоке генезиса. Если вы этого не сделали, блок генезиса будет считаться некорректным и приложение не запустится | |

### Настройки генератора блоков

В секции `miner` можно задать параметры генератора блоков.

| Имя | Описание | Значение по умолчанию |
|------------------------------------------------------|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `enable` | Включение/выключение генерации блоков. По умолчанию генерация включена, но если ее выключить, то нода не будет генерировать новые блоки |
| `quorum` | Минимальное количество подключенных peer-нод, необходимое для генерации новых блоков | По умолчанию задано значение 1. Это означает, что ваша нода начнет генерацию блоков, как только подключится к первой peer-ноде P2P-сети. Значение 0 включает офлайн-генерацию |
| `interval-after-last-block-then-generation-is-allowed` | Настройка загрузки и генерации блоков | По умолчанию задано значение 1 день. Это означает, что ваша нода не начнет генерацию, если последний блок локального блокчейна старше 1 дня. Используя данный параметр, вы даете команду ноде актуализировать блокчейн перед началом генерации новых блоков. Это применимо только после длительных отключений ноды |
| `no-quorum-mining-delay` | Задержка попыток генерации блоков, если кворум недоступен |
| `micro-block-interval` | Интервал между микроблоками |
| `max-transactions-in-micro-block` | Максимальное количество транзакций в микроблоке |
| `min-micro-block-age` | Генератор блока ссылается на лучший микроблок, который существует не менее указанного времени |
| `minimal-block-generation-offset` | Минимальный оффсет генерации блока |
| `max-pack-time` | Максимальное время packUnconfirmed |

### Настройки REST API

Секция `rest-api` файла конфигурации ноды содержит настройки [Node REST API](/ru/waves-node/node-api/).

| Имя | Описание | Значение по умолчанию |
| :--- | :--- | :---- |
|`enable` | Активирует REST API. <br>Для деактивации REST API укажите значение `no` | `yes` |
|`bind-address` | Cетевой адрес, по которому REST API будет принимать входящие подключения. <br>**Примечание**: не рекомендуется менять значение по умолчанию. Используйте [Nginx’s proxy pass module](http://nginx.org/ru/docs/http/ngx_http_proxy_module.html) или [SSH port forwarding](https://blog.trackets.com/2014/05/17/ssh-tunnel-local-and-remote-port-forwarding-explained-with-examples.html) для внешнего доступа. | `"127.0.0.1"` |
| `port` | Номер порта, через который REST API будет ожидать подключения. | `6869` |
| `api-key-hash` | <a name="api-key-hash"></a> Хэш [API ключа](https://en.wikipedia.org/wiki/Application_programming_interface_key), который предоставляется владельцем ноды. [Подробнее про хэш API ключа](/ru/waves-node/node-api/api-key) | "" |
| `cors` | Включение/выключение отправки кросс-доменных запросов CORS к ноде от JavaScript | yes |

### Настройки синхронизации

В секции `synchronization` можно настроить различные параметры процесса синхронизации.

| Имя | Описание | Значение по умолчанию |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `max-rollback` | Количество блоков, которые будут сброшены в случае обнаружения форка. Если нода обнаружит форк с более низким `score`, она попытается переключиться на другой форк, для этого нода откатится на несколько блоков. Если обнаруженный форк длиннее заданного значения параметра, нода не будет переключаться, даже если `score` другого форка выше | |
| `max-chain-length` | Размер буфера для хранения блоков обнаруженного форка. Размер должен быть больше, чем максимальная длина форка | |
| `synchronization-timeout` | Таймаут операции загрузки блока | |
| `score-broadcast-interval` | Интервал между публикациями `score` в cети P2P | |
| `score-ttl` | Интервал `time-to-live` публикуемых пакетов `score` | |
| `remote-score-debounce` | Время ожидания получения следующего обновления данных `score` от других peer-нод | |
| `history-replier` | Во вложенной секции можно задать количество последних блоков и микроблоков, которые будут кэшироваться в памяти | |
| `micro-block-synchronizer` | Во вложенной секции можно задать различные параметры протокола Waves-NG | |

### Настройки UTX-пула

В секции `utx` можно настроить параметры пула неподтвержденных транзакций.

| Имя | Описание | Значение по умолчанию |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `max-size` | Размер пула неподтвержденных транзакций (как скриптованных, так и не скриптованных) | |
| `max-scripted-size` | Размер пула неподтвержденных скриптованных транзакций. До версии ноды 1.1.6 транзакции вызова скрипта не учитывались (учитывались транзакции, для валидации которых требуется выполнить смарт-контракт) | |
| `max-transaction-age` | Задает максимальную давность транзакций. Более старые транзакции не будут допускаться в UTX-пул | |                                                                                                                                                                                                            |               |

### Настройки фич

Секция `features` задает параметры работы с [фичами](/ru/waves-node/features/)

| Имя | Описание | Значение по умолчанию |
|--------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|--------------------------------|
| `auto-shutdown-on-unsupported-feature` | Если этот параметр включен, нода будет остановлена при активации фичи, которая не поддерживается нодой. | yes                            |
| `supported`                            | Список идентификаторов фич, поддерживаемых владельцем ноды.                                                    | По умолчанию список пуст. |

**Пример**:

```bash
 features {
   auto-shutdown-on-unsupported-feature = yes
   supported = []
 }
```

<a id="rewards"></a>

### Настройки вознаграждения

В данной секции вы можете указать желаемый размер вознаграждения за генерацию блоков в параметре `desired`. Значение указывается в [WAVELET](/ru/blockchain/token/waves).

Если значение больше текущего размера вознаграждения, то генератор блоков голосует за увеличение вознаграждения; если меньше — за уменьшение.

**Пример**: желаемый размер вознаграждения 7 WAVES:

```js
waves {
  rewards {
    desired = 700000000
  }
}  
```

В качестве значения может быть указано любое целое число в диапазоне от 0 до 9 223 372 036 854 775 807 включительно.
Отрицательные значения игнорируются.

Подробнее см. в статье [Вознаграждение за майнинг](/ru/blockchain/mining/mining-reward).
