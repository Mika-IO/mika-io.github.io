import streamlit as st
import pandas as pd
import os

# Configuração básica da página
st.set_page_config(page_title="Leitor de Arquivos .tab", layout="wide")

st.title("📊 Visualizador de Arquivos .tab")
st.write("Lendo dois arquivos tabulares (UTF-8) a partir de caminhos predefinidos no código.")

st.divider()

# ==========================================
# DEFINA OS CAMINHOS DOS SEUS ARQUIVOS AQUI
# ==========================================
caminho_arquivo1 = "PPR_TRIB_sas.tab" 
caminho_arquivo2 = "PPR_TRIB.tab"

# Criação de duas colunas para mostrar as tabelas lado a lado
col1, col2 = st.columns(2)

with col1:
    st.subheader("Tabela 1 (UTF-8)")
    
    if os.path.exists(caminho_arquivo1):
        try:
            # Lendo o arquivo 1 indicando o separador 'tab' e o encoding utf-8
            df1 = pd.read_csv(caminho_arquivo1, sep='\t', encoding='utf-8')
            st.success(f"Arquivo carregado: `{caminho_arquivo1}`")
            st.dataframe(df1, use_container_width=True)
        except Exception as e:
            st.error(f"Erro ao processar a Tabela 1.\nDetalhes: {e}")
    else:
        st.warning(f"Arquivo não encontrado: `{caminho_arquivo1}`. Verifique o caminho.")

with col2:
    st.subheader("Tabela 2 (UTF-8)")
    
    if os.path.exists(caminho_arquivo2):
        try:
            # Lendo o arquivo 2 indicando o separador 'tab' e o encoding utf-8
            df2 = pd.read_csv(caminho_arquivo2, sep='\t', encoding='utf-8')
            st.success(f"Arquivo carregado: `{caminho_arquivo2}`")
            st.dataframe(df2, use_container_width=True)
        except Exception as e:
            st.error(f"Erro ao processar a Tabela 2.\nDetalhes: {e}")
    else:
        st.warning(f"Arquivo não encontrado: `{caminho_arquivo2}`. Verifique o caminho.")
