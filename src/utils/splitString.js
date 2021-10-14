export default class SplitString{

    static takeFirstLetterOfEachString (str){

        var matches = str.match(/\b(\w)/g);
        var acronym = matches.join('');
        var sliceAcronym = acronym.slice(0, 2);
        return sliceAcronym;
    
    }

}
