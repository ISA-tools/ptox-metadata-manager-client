<template>
  <div
    id="validationReport animated fadeIn slow"
    class="pa-0"
  >
    <div class="summary">
      <CreatorSubtitle
        icon="fas fa-info"
        text="Report summary"
      />
      <div class="pa-4">
        <ul>
          <li>
            <a
              :href="'https://docs.google.com/spreadsheets/d/' + recordId"
              target="_blank"
            >
              <strong> View file on google drive </strong>
            </a>
          </li><li>
            <strong> Total number of errors: </strong>
            {{ totalErrors }}
          </li>
          <li>
            <strong> Number of lines with at least one error: </strong>
            {{ Object.keys(report).length }}
          </li>
        </ul>
      </div>
    </div>
    <CreatorSubtitle
      icon="fas fa-bug"
      text="Report details"
    />
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="errors"
            :items-per-page="100"
            group-by="identifier"
            class="elevation-1 mt-4"
          >
            <template #[`group.header`]="{items, isOpen, toggle}">
              <th colspan="2">
                <div class="d-flex align-center">
                  <v-icon
                    class="primary--text mr-4"
                    large
                    @click="toggle"
                  >
                    {{ isOpen ? 'fas fa-circle-minus' : 'fas fa-circle-plus' }}
                  </v-icon>
                  <span class="text-body-1 primary--text righteous flex-grow-1">
                    {{ items[0].identifier }} (Line {{ items[0].line }})
                  </span>
                  <span class="flex-grow-0"> {{ items.length }} errors</span>
                </div>
              </th>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ValidationReport",
  props: {
    report: {
      type: Object,
      required: true
    },
    recordId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'Identifier',
          align: 'start',
          sortable: false,
          value: 'identifier'
        },
        {
          text: 'Field',
          align: 'start',
          sortable: false,
          value: 'field_concerned'
        },
        {
          text: 'Message',
          align: 'center',
          sortable: false,
          value: 'message'
        }
      ]
    }
  },
  computed: {
    totalErrors() {
      return Object.keys(this.report).reduce((acc, line) => {return acc + this.report[line].length }, 0)
    },
    errors() {
      return Object.keys(this.report).reduce((acc, line) => {
        let current_line = [ ...this.report[line] ]
        const lineSplit = line.split(' (')
        const lineLabel = lineSplit[0].replace('Record at line', '')
        const lineIdentifier = lineSplit.length > 1 ? lineSplit[1].replace(')', '') : 'General'
        return acc.concat(current_line.map(error => {
          error['line'] = lineLabel
          error['identifier'] = lineIdentifier
          return error
        }))
      }, [])
    }
  }
}
</script>

<style scoped>
#validationReport ul {
  list-style-type: none;
  padding-left: 0;
}
</style>
