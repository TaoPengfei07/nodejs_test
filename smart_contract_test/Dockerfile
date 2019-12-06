FROM registry.cn-hangzhou.aliyuncs.com/canonchain/czr:ci as czr

FROM registry.cn-hangzhou.aliyuncs.com/canonchain/czr_tester:ci as tester

COPY --from=czr /usr/local/bin /usr/local/bin

ARG branch=master
ARG ssh_key
ARG ssh_pub_key

# add SSH keys
RUN mkdir -p /root/.ssh \
    && echo "$ssh_key" > /root/.ssh/id_rsa \
    && echo "$ssh_pub_key" > /root/.ssh/id_rsa.pub \
    && chmod -R 600 /root/.ssh/id_rsa \
    && chmod -R 600 /root/.ssh/id_rsa.pub \
    && ssh-keyscan -H e.coding.net >> /root/.ssh/known_hosts

RUN git clone -b $branch git@e.coding.net:canonchain-devtool/smart_contract_test.git --recursive

COPY do_smart_contract_test.js ./

CMD ["node", "do_smart_contract_test.js"]

#RUN (canonchain --daemon --rpc --rpc_control --network=4 --data_path=smart_contract_test --witness --witness_account=smart_contract_test/czr_3tiy2jgoUENkszPjrHjQGfmopqwV5m9BcEh2Grb1zDYgSGnBF7.json --password=123 &) \
#    && sleep 15s \
#    && curl -d "{\"action\": \"account_import\",\"json\": \"{\\\"account\\\":\\\"czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u\\\",\\\"kdf_salt\\\":\\\"774DDE2B6D01D6A2B000BB42F8118E2C\\\",\\\"iv\\\":\\\"5EF469016DB117B4437FB46D37BFA925\\\",\\\"ciphertext\\\":\\\"2B9567F4184B4D0A4AD9D5A3BF94805662B562167AFBEC575B06C23F708F0CA0\\\"}\"}" http://127.0.0.1:8765 \
#    && curl -d "{\"action\": \"account_import\",\"json\": \"{\\\"account\\\":\\\"czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi\\\",\\\"kdf_salt\\\":\\\"EE77309E8A04EDF777BBE7246AE15DDC\\\",\\\"iv\\\":\\\"F1C2EE0F24EEE85EECD5E538A4601C41\\\",\\\"ciphertext\\\":\\\"22C6DB6AA029C2D3CF7D546EC9B2DC99D90E744A507FEE390F81A0C50E324C4B\\\"}\"}" http://127.0.0.1:8765 \
#    && curl -d "{\"action\": \"send_block\",\"from\":\"czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u\",\"to\":\"czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi\",\"amount\":\"100000000000000000000000000\",\"password\":\"12345678\",\"gas\":\"21000\",\"gas_price\":\"100000000000\",\"data\": \"\"}" http://127.0.0.1:8765 \
#    && sleep 20s \
#    && curl -d "{\"action\": \"account_balance\",\"account\":\"czr_35vDkfSth7N1WFjh9MT7NZekYGdu6ihLSMmmGjCwBPSHTm5QWi\"}" http://127.0.0.1:8765 \
#    && cd smart_contract_test/CRC20-Test/ \
#    && npm i \
#    && cd .. \
#    && cd Test1/ \
#    && npm i \
#    && cd .. \
#    && cd Test2/ \
#    && npm i \
#    && cd .. \
#    && cd Test3/ \
#    && npm i \
#    && cd .. \
#    && cd Test4/ \
#    && npm i \
#    && cd .. \
#    && cd TestAddressAndKill/ \
#    && npm i \
#    && cd .. \
#    && cd TestFactoryModel/ \
#    && npm i \
#    && cd .. \
#    && cd TestPekka/ \
#    && npm i \
#    && cd .. \
#    && cd TestScript/ \
#    && npm i \
#    && npm i mocha -g \
#    && cd bego/ \
#    && node testBegoOnce
