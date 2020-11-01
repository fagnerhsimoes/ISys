FROM microsoft/mssql-server-linux
EXPOSE 1433
ENV MSSQL_SA_PASSWORD 135790@Big
ENV ACCEPT_EULA Y 
ENV MSSQL_PID=Developer



COPY ./GenerateDataBase.sql /setup_scripts/GenerateDataBase.sql

RUN ( /opt/mssql/bin/sqlservr --accept-eula & ) | grep -q "Service Broker manager has started" \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P ${MSSQL_SA_PASSWORD} -i /setup_scripts/GenerateDataBase.sql \
    && pkill sqlservr 

CMD ["/opt/mssql/bin/sqlservr"]

