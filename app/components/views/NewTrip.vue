<template>
    <Page class="page">
        <ActionBar title="New Trip">
        </ActionBar>
        <ScrollView>
            <StackLayout orientation="vertical" width="*" height="*"
                backgroundColor="lightgray">
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Snp2FzERPRkmWHji2mDSllE84xMlaLNpubYnDp2umpnOnk92" />

                <RadDataForm :source="form" />
                <PickerField hint="Condition" :items="pickerItems" ref="apiPicker"></PickerField>

                <Button text="View" width="400" height="20%" backgroundColor="darkgreen"
                    marginTop="20" textAlignment="center" color="white"
                    fontSize="40" fontWeight="bold" borderRadius="30" @tap="onCall()" />
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
    import axios from 'axios'
 
    Vue.use(PickerField);
    Vue.use(RadDataForm);

    export default {
        methods: {
            onViewButtonClick(form) {
                let picker = this.$refs.apiPicker.nativeView;
                console.log('picker', picker.selectedValue)
                console.log(form.To, form.From)
            },
            onCall() {
                axios({
                    method: "GET",
                    url: "https://api.tomtom.com/map/1/staticimage?layer=basic&style=main&format=png&center=4.899886%2C%2052.379031&width=512&height=512&view=Unified&key=vEjGapnUURlnmiz9LAh4GsXnTkbD9UGw",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                     }).then(result => {
                console.log('result', result);
                }, error => {
                console.error(error);
                });
            }
            
        },
        data() {
            return {
                pickerItems: [
                    'Joy',
                    'Commute',
                    'Speedy'
                ],
                form: {
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