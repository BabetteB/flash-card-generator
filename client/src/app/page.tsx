import Collection from "./components/collections/collection";
import NewCollection from "./components/collections/new-collection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.title_pane}>
        <h2>
          Flash Card Generator
        </h2>
      </div>
      <div className={styles.collection_pane}>
        <h3>My Collections</h3>
        <div className="divider"></div>

        <NewCollection/>

        <div className="divider"></div>

        <div className={styles.collections_container}>
          <Collection collectionName="Test collection very vereeeeeeeeeeeeeeeeeeeeeey very very very very very very very very very very very very very very very very very very veeeeeeeeeeeery very very very very very very very very very long name"/>
          <Collection collectionName="Test collection name 2"/>
          <Collection collectionName="Test collection very vereeeeeeeeeeeeeeeeeeeeeey very very very very very very very very very very very very very very very very very very veeeeeeeeeeeery very very very very very very very very very long name"/>
          <Collection collectionName="Test collection name 2"/>
          <Collection collectionName="Test collection very vereeeeeeeeeeeeeeeeeeeeeey very very very very very very very very very very very very very very very very very very veeeeeeeeeeeery very very very very very very very very very long name"/>
          <Collection collectionName="Test collection name 2"/>
          <Collection collectionName="Test collection very vereeeeeeeeeeeeeeeeeeeeeey very very very very very very very very very very very very very very very very very very veeeeeeeeeeeery very very very very very very very very very long name"/>
          <Collection collectionName="Test collection name 2"/>
          <Collection collectionName="Test collection very vereeeeeeeeeeeeeeeeeeeeeey very very very very very very very very very very very very very very very very very very veeeeeeeeeeeery very very very very very very very very very long name"/>
          <Collection collectionName="Test collection name 2"/>
          <Collection collectionName="Test collection very vereeeeeeeeeeeeeeeeeeeeeey very very very very very very very very very very very very very very very very very very veeeeeeeeeeeery very very very very very very very very very long name"/>
          <Collection collectionName="Test collection name 2"/>
          <Collection collectionName="Test collection very vereeeeeeeeeeeeeeeeeeeeeey very very very very very very very very very very very very very very very very very very veeeeeeeeeeeery very very very very very very very very very long name"/>
          <Collection collectionName="Test collection name 2"/>
        </div>
      </div>
    </main>
  );
}
