/**
 * Created by mustang on 30/03/17.
 */
export const readCsv = (rawContent)=>{
    /*
     *split function will create a new array where each row will be one element
     * */
    const contents = rawContent.trim().split('\n')
    const header = contents[0].split(',')
    return {
        headerRow: header,
        /*
        * slice() creates a copy of the original array and the copy is sent to e
        * reduce() takes 2 parameters, first is the callback function and other is optional parameter
        * */
        dataRows: contents.slice(1).map(
            e => e.split(',').reduce((map, key, i) => {
                    map[header[i]] = key
                    return map
                }, {}
            )
        )
    }
}