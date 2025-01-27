import styles from "./new-collection.module.css";

export default function NewCollection(){
    return (
        <div className={styles.collection_container}>
            <p className="highlighted">
                + New
            </p>
        </div>
    )
}