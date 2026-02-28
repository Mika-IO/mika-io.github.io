import streamlit as st
import pandas as pd
import os

# Configuração básica da página
st.set_page_config(page_title="Leitor de Arquivos .tab", layout="wide")

st.title("📊 Visualizador de Arquivos .tab")
st.write("Lendo arquivos a partir de caminhos predefinidos no código.")

st.divider()

# ==========================================
# DEFINA OS CAMINHOS DOS SEUS ARQUIVOS AQUI
# ==========================================
# Pode ser o caminho relativo (se o arquivo estiver na mesma pasta do script)
# ou o caminho absoluto (ex: "C:/MeusDocumentos/arquivo.tab")
caminho_utf7 = "arquivo_utf7.tab" 
caminho_utf8 = "arquivo_utf8.tab"

# Criação de duas colunas para mostrar as tabelas lado a lado
col1, col2 = st.columns(2)

with col1:
    st.subheader("Tabela UTF-7")
    
    # Verifica se o arquivo realmente existe no caminho informado
    if os.path.exists(caminho_utf7):
        try:
            # Lendo o arquivo indicando o separador 'tab' e o encoding utf-7
            df_utf7 = pd.read_csv(caminho_utf7, sep='\t', encoding='utf-7')
            st.success(f"Arquivo carregado: `{caminho_utf7}`")
            st.dataframe(df_utf7, use_container_width=True)
        except Exception as e:
            st.error(f"Erro ao processar o arquivo UTF-7.\nDetalhes: {e}")
    else:
        st.warning(f"Arquivo não encontrado: `{caminho_utf7}`. Verifique o caminho.")
