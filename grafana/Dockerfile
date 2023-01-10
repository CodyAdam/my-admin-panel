FROM grafana/grafana:9.3.2 as prod

ENV GF_SERVER_SERVE_FROM_SUB_PATH=true

USER root

COPY ./dashboard.yml /etc/grafana/provisioning/dashboards/dashboard.yaml
COPY ./datasource.yml /etc/grafana/provisioning/datasources/datasource.yaml
COPY ./dashboards /var/lib/grafana/dashboards
COPY ./config.ini /etc/grafana/grafana.ini
