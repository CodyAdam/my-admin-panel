FROM bitnami/prometheus:2.41.0 as prod

USER root

COPY ./prometheus.yml /etc/prometheus/prometheus.yml

CMD [\
    "--config.file=/etc/prometheus/prometheus.yml",\
    "--web.external-url=/prometheus/",\
    "--web.route-prefix=/",\
    "--storage.tsdb.path=/opt/bitnami/prometheus/data",\
    "--web.console.libraries=/opt/bitnami/prometheus/conf/console_libraries",\
    "--web.console.templates=/opt/bitnami/prometheus/conf/consoles"\
]