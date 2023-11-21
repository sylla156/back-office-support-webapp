import React from "react"
import format from "date-fns/format"

export const ActivityLogs = (props) => {
    const logs = props.logs

    /**
     * Extracts the first two letters from each word in a string and concatenates them into a single string.
     *
     * @param {string} chaine - The input string.
     * @return {string} The final concatenated string.
     */
    const extraireDeuxPremieresLettres = (chaine) => {
        const mots = chaine.split(' ');
        const resultat = mots.map(mot => mot.slice(0, 1));
        const resultatFinal = resultat.join('');

        return resultatFinal.toUpperCase();
    }

    return (
        <>
            <div className="d-flex flex-column p-4">
                <div className="justify-content-between d-flex flex-row">
                    <h4>Activity logs</h4>
                </div>
                {logs.map((log, index) => (
                    <div key={index} className="mt-2 border rounded-3 py-4 px-3 d-flex flex-row align-items-center">
                        <div>
                            <span
                                className=" p-2 mb-2 rounded text-center border bg-warning border-warning"
                                style={{ width: 10, height: 10 }}
                            >
                                {extraireDeuxPremieresLettres(log.updateBy.name)}
                            </span>
                        </div>
                        <div className="justify-centent-center align-items-center">
                            <span className="ms-3">{log.message} le {log.updatedAt}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}