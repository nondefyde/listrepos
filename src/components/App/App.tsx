import * as React from 'react';
import axios from 'axios';
import {Alert, Table} from 'antd';
import 'antd/dist/antd.css';
import styles from './App.module.css';
import {TableColumns, TableData} from "../interfaces/Table";
import {RepoData} from "../interfaces/RepoData";

interface AppProps {
    username: string
}

const AppComponent: React.FC<AppProps> = ({username}) => {
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [data, setData] = React.useState<TableData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  /**
     * The function that will be called to retrieve information from github
     * @param username
     */
  const getRepos = (username: string) => {
    const repoUrl = `https://api.github.com/users/${username}/repos`;
    setLoading(true);
    axios.get(repoUrl).then(responses => {
      const formattedData: TableData[] = responses.data.map((repoData: RepoData) => {
        return {
          key: repoData.id,
          name: repoData.name,
          forks: repoData.forks,
          stars: repoData.stargazers_count,
        };
      });
      setData(formattedData);
      setLoading(false);
    }).catch(error => {
      setLoading(false);
      setErrorMessage(error.response.statusText);
    });
  };

  React.useEffect(() => {
    getRepos(username);
  }, []);


  const columns: TableColumns[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'id',
    },
    {
      title: 'Stars',
      dataIndex: 'stars',
      key: 'id',
    },
    {
      title: 'Forks',
      dataIndex: 'forks',
      key: 'id',
    },
  ];

  return <div className={`${styles.App}`}>
    {!!errorMessage && <Alert message={errorMessage}/>}
    <section
      className={`${styles.tableContainer}`}>
      <div className={`${styles.tableWrapper}`}>
        <div className={`${styles.tableHeader}`}>
          <span className={`${styles.tableHeaderTitle}`}>Git Repos</span>
        </div>
        <Table dataSource={data} columns={columns} scroll={{y: 520}} loading={loading}/>
      </div>
    </section>
  </div>;
};


export default AppComponent;
