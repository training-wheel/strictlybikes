<template>
    <Page class="page">
        <ActionBar title="Home">
            <Button height="40" width="40" borderRadius="30" text="Profile"
                color="white" backgroundColor="green" ios.position="right"
                android.position="popup" @tap="$goto('Profile')" />
        </ActionBar>
        <ScrollView>
            <StackLayout orientation="vertical" width="*" height="*"
                backgroundColor="lightgray">
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Snp2FzERPRkmWHji2mDSllE84xMlaLNpubYnDp2umpnOnk92" />

                <RadDataForm :source="album" />
                <PickerField hint="Condition" :items="pickerItems"></PickerField>

                <Button text="View" width="400" height="20%" backgroundColor="darkgreen"
                    marginTop="20" textAlignment="center" color="white"
                    fontSize="40" fontWeight="bold" borderRadius="30" @tap="$goto('NewTrip')" />
                <Button text="Start Trip" width="400" height="20%"
                    backgroundColor="darkgreen" marginTop="20" textAlignment="center"
                    color="white" fontSize="40" fontWeight="bold"
                    borderRadius="30" @tap="$goto('ActiveTrip')" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import Vue from "nativescript-vue";
    import RadDataForm from "nativescript-ui-dataform/vue";
    import PickerField from 'nativescript-picker/vue';
 
    Vue.use(PickerField);
    Vue.use(RadDataForm);

    export default {
        data() {
            return {
                pickerItems: [
                    'Joy',
                    'Commute',
                    'Speedy'
                ],
                album: {
                    From: "X",
                    To: "Y",
                }
            };
        }
    };
</script>

<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }
</style>