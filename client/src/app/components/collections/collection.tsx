import styles from "./collection.module.css";

export default function Collection({collectionName} : {collectionName : string}){
    return (
        <div className={styles.collection_container}>
            <p className="highlighted">
                {collectionName}
            </p>
        </div>
    )
}